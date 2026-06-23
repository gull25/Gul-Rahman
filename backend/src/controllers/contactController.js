// src/controllers/contactController.js
const nodemailer = require('nodemailer')
const Contact    = require('../models/Contact')

// ── Email transporter ──────────────────────────────
const transporter = nodemailer.createTransport({
  host:   process.env.EMAIL_HOST,
  port:   Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

// ── @desc   Submit contact form
// ── @route  POST /api/contact
// ── @access Public
async function submitContact(req, res, next) {
  try {
    const {
      firstName, lastName, email,
      phone, subject, budget, message,
    } = req.body

    // Save to database
    const contact = await Contact.create({
      firstName,
      lastName,
      email,
      phone:     phone || '',
      subject,
      budget:    budget || '',
      message,
      ipAddress: req.ip,
    })

    // Send notification email to portfolio owner
    const ownerMailOptions = {
      from:    `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to:      process.env.EMAIL_TO,
      subject: `📬 New Contact: ${subject} — ${firstName} ${lastName}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#1d4ed8;border-bottom:2px solid #e5e7eb;padding-bottom:12px;">
            New Portfolio Message
          </h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;color:#6b7280;font-size:13px;width:120px;">Name</td>
              <td style="padding:8px 0;font-weight:600;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;font-size:13px;">Email</td>
              <td style="padding:8px 0;">
                <a href="mailto:${email}" style="color:#1d4ed8;">${email}</a>
              </td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding:8px 0;color:#6b7280;font-size:13px;">Phone</td>
              <td style="padding:8px 0;">${phone}</td>
            </tr>` : ''}
            <tr>
              <td style="padding:8px 0;color:#6b7280;font-size:13px;">Subject</td>
              <td style="padding:8px 0;">${subject}</td>
            </tr>
            ${budget ? `
            <tr>
              <td style="padding:8px 0;color:#6b7280;font-size:13px;">Budget</td>
              <td style="padding:8px 0;">${budget}</td>
            </tr>` : ''}
          </table>
          <div style="background:#f9fafb;border:1px solid #e5e7eb;
            border-radius:8px;padding:16px;margin-top:16px;">
            <p style="color:#6b7280;font-size:12px;margin:0 0 8px;">Message</p>
            <p style="margin:0;line-height:1.7;">${message}</p>
          </div>
          <p style="color:#9ca3af;font-size:12px;margin-top:20px;">
            Received at ${new Date().toLocaleString()} — ID: ${contact._id}
          </p>
        </div>
      `,
    }

    // Send auto-reply to the sender
    const autoReplyOptions = {
      from:    `"Alex Johnson" <${process.env.EMAIL_USER}>`,
      to:      email,
      subject: `Thanks for reaching out, ${firstName}! 👋`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#111827;">Hi ${firstName},</h2>
          <p style="color:#374151;line-height:1.8;">
            Thank you for getting in touch! I've received your message about
            <strong>${subject}</strong> and will get back to you within
            <strong>24 hours</strong>.
          </p>
          <div style="background:#f9fafb;border-left:4px solid #1d4ed8;
            padding:16px;margin:24px 0;border-radius:0 8px 8px 0;">
            <p style="margin:0;color:#6b7280;font-size:13px;">Your message</p>
            <p style="margin:8px 0 0;color:#374151;">${message}</p>
          </div>
          <p style="color:#374151;line-height:1.8;">
            In the meantime, feel free to check out my
            <a href="${process.env.CLIENT_URL}/projects"
              style="color:#1d4ed8;">projects</a> or
            <a href="${process.env.CLIENT_URL}/blog"
              style="color:#1d4ed8;">blog</a>.
          </p>
          <p style="color:#374151;">
            Talk soon,<br/>
            <strong>Alex Johnson</strong><br/>
            <span style="color:#6b7280;font-size:13px;">Frontend Developer</span>
          </p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;"/>
          <p style="color:#9ca3af;font-size:12px;">
            This is an automated reply. Please do not reply to this email directly.
          </p>
        </div>
      `,
    }

    // Send both emails (don't block response if email fails)
    try {
      await transporter.sendMail(ownerMailOptions)
      await transporter.sendMail(autoReplyOptions)
    } catch (emailErr) {
      console.error('⚠️  Email failed (message still saved):', emailErr.message)
    }

    res.status(201).json({
      success: true,
      message: 'Message received! I will get back to you within 24 hours.',
      data: {
        id:        contact._id,
        firstName: contact.firstName,
        email:     contact.email,
        subject:   contact.subject,
      },
    })
  } catch (error) {
    next(error)
  }
}

// ── @desc   Get all contact messages (admin)
// ── @route  GET /api/contact
// ── @access Private (future admin auth)
async function getContacts(req, res, next) {
  try {
    const page  = parseInt(req.query.page)  || 1
    const limit = parseInt(req.query.limit) || 20
    const skip  = (page - 1) * limit

    const total    = await Contact.countDocuments()
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-ipAddress')

    res.status(200).json({
      success: true,
      count:   contacts.length,
      total,
      page,
      pages:   Math.ceil(total / limit),
      data:    contacts,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { submitContact, getContacts }