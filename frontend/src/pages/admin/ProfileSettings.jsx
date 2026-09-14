import { useState, useEffect } from 'react';
import { fetchProfile, updateAvatar } from '../../services/api';
import './Admin.css';

export default function ProfileSettings() {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await fetchProfile();
      if (data.avatarUrl) {
        setAvatarPreview(data.avatarUrl);
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check size (15MB)
      if (file.size > 15 * 1024 * 1024) {
        setMessage('File is too large. Max size is 15MB.');
        return;
      }
      setSelectedFile(file);
      setAvatarPreview(URL.createObjectURL(file));
      setMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setMessage('Please select an image first.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const data = await updateAvatar(formData);
      setAvatarPreview(data.avatarUrl);
      setMessage('Avatar updated successfully!');
      setSelectedFile(null); // Clear selected file after successful upload
    } catch (err) {
      setMessage(err.message || 'Failed to update avatar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Profile Settings</h2>
      </div>

      <div className="admin-card">
        <h3>Update Avatar</h3>
        {message && (
          <div className={`admin-message ${message.includes('success') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label>Current Avatar</label>
            <div className="avatar-preview-container" style={{ margin: '1rem 0' }}>
              <img 
                src={avatarPreview || '/avatar.png'} 
                alt="Avatar Preview" 
                style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%', border: '2px solid #333' }}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Select New Image (Max 15MB)</label>
            <input 
              type="file" 
              accept="image/png, image/jpeg, image/jpg, image/webp" 
              onChange={handleFileChange}
              className="form-control"
            />
          </div>

          <button type="submit" disabled={loading || !selectedFile} className="admin-btn-primary">
            {loading ? 'Uploading...' : 'Save Avatar'}
          </button>
        </form>
      </div>
    </div>
  );
}
