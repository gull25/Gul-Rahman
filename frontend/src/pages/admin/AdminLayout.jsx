import { Navigate, Outlet, Link, useNavigate } from 'react-router-dom';
import './Admin.css';

export default function AdminLayout() {
  const token = localStorage.getItem('adminToken');
  const navigate = useNavigate();

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="admin-nav">
          <Link to="/admin/projects" className="admin-nav-link">Projects</Link>
          <a href="/" target="_blank" rel="noopener noreferrer" className="admin-nav-link">View Site</a>
          <button onClick={handleLogout} className="admin-nav-link logout-btn">Logout</button>
        </nav>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
