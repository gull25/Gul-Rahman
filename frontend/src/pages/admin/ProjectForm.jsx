import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { fetchProjectById, createProject, updateProject } from '../../services/api';

const DEFAULT_PROJECT = {
  title: '',
  desc: '',
  category: 'react',
  status: 'Published',
  featured: false,
  stars: 0,
  demo: '',
  code: '',
  color: '#1d4ed8',
  colorBg: '#eff6ff',
  order: 0,
  tags: '',
  features: '',
};

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState(DEFAULT_PROJECT);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing) {
      const loadProject = async () => {
        try {
          const res = await fetchProjectById(id);
          const p = res.data;
          setFormData({
            ...p,
            tags: p.tags ? p.tags.join(', ') : '',
            features: p.features ? p.features.join('\n') : '',
          });
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      loadProject();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      // Don't append image string if we have a new file
      if (key === 'image' && imageFile) return;
      
      // Handle arrays
      if (key === 'tags') {
        const tagsArray = formData.tags.split(',').map(s => s.trim()).filter(Boolean);
        submitData.append('tags', JSON.stringify(tagsArray));
      } else if (key === 'features') {
        const featuresArray = formData.features.split('\n').map(s => s.trim()).filter(Boolean);
        submitData.append('features', JSON.stringify(featuresArray));
      } else {
        submitData.append(key, formData[key]);
      }
    });

    if (imageFile) {
      submitData.append('image', imageFile);
    }

    try {
      if (isEditing) {
        await updateProject(id, submitData);
      } else {
        await createProject(submitData);
      }
      navigate('/admin/projects');
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>{isEditing ? 'Edit Project' : 'New Project'}</h1>
        <Link to="/admin/projects" className="admin-btn-ghost">Back</Link>
      </div>

      <div className="admin-form-container">
        {error && <div className="admin-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-row">
            <div className="admin-form-group flex-2">
              <label>Title *</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="admin-form-group flex-1">
              <label>Category *</label>
              <select name="category" value={formData.category} onChange={handleChange} required>
                <option value="react">React</option>
                <option value="fullstack">Full Stack</option>
                <option value="design">Design</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="admin-form-group flex-1">
              <label>Status *</label>
              <select name="status" value={formData.status} onChange={handleChange} required>
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>

          <div className="admin-form-group">
            <label>Description *</label>
            <textarea name="desc" value={formData.desc} onChange={handleChange} required rows={3} />
          </div>

          <div className="form-row">
            <div className="admin-form-group flex-1">
              <label>Demo Link</label>
              <input type="url" name="demo" value={formData.demo} onChange={handleChange} />
            </div>
            <div className="admin-form-group flex-1">
              <label>Code Link</label>
              <input type="url" name="code" value={formData.code} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="admin-form-group flex-1">
              <label>Image Thumbnail</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              {isEditing && formData.image && !imageFile && (
                <div className="admin-img-preview">Current: {formData.image}</div>
              )}
            </div>
            <div className="admin-form-group flex-1">
              <label>Theme Color</label>
              <input type="color" name="color" value={formData.color} onChange={handleChange} />
            </div>
            <div className="admin-form-group flex-1">
              <label>Background Color</label>
              <input type="color" name="colorBg" value={formData.colorBg} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="admin-form-group flex-1">
              <label>Tags (comma separated)</label>
              <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="React, Node.js, MongoDB" />
            </div>
            <div className="admin-form-group flex-1">
              <label>Order (lower is first)</label>
              <input type="number" name="order" value={formData.order} onChange={handleChange} />
            </div>
            <div className="admin-form-group flex-1">
              <label>Stars</label>
              <input type="number" name="stars" value={formData.stars} onChange={handleChange} />
            </div>
          </div>

          <div className="admin-form-group">
            <label>Features (one per line)</label>
            <textarea name="features" value={formData.features} onChange={handleChange} rows={4} placeholder="Authentication&#10;Real-time chat" />
          </div>

          <div className="admin-form-group checkbox-group">
            <label>
              <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
              Make this a Featured Project
            </label>
          </div>

          <div className="admin-form-actions">
            <button type="submit" className="admin-btn" disabled={saving}>
              {saving ? 'Saving...' : 'Save Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
