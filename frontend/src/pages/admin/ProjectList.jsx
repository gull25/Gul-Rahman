import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProjects, deleteProject } from '../../services/api';

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    try {
      const res = await fetchProjects();
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        loadProjects();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  if (loading) return <div>Loading projects...</div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Projects</h1>
        <Link to="/admin/projects/new" className="admin-btn">Add New Project</Link>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project._id}>
                <td>{project.title}</td>
                <td style={{textTransform: 'capitalize'}}>{project.category}</td>
                <td>
                  <span className={`status-badge status-${project.status.toLowerCase()}`}>
                    {project.status}
                  </span>
                </td>
                <td>{project.featured ? 'Yes' : 'No'}</td>
                <td>
                  <div className="admin-actions">
                    <Link to={`/admin/projects/${project._id}/edit`} className="admin-btn-small">Edit</Link>
                    <button onClick={() => handleDelete(project._id)} className="admin-btn-small danger">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan="5" style={{textAlign: 'center'}}>No projects found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
