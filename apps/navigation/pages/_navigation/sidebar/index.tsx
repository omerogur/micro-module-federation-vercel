import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Sidebar() {
  const router = useRouter();

  const menuItems = [
    { path: '/', label: 'Ana Sayfa', icon: '🏠' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Microfrontend App</h2>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.path} className="sidebar-menu-item">
              <Link 
                href={item.path}
                className={`sidebar-menu-link ${router.pathname === item.path ? 'active' : ''}`}
              >
                <span className="sidebar-menu-icon">{item.icon}</span>
                <span className="sidebar-menu-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <style jsx>{`
        .sidebar {
          width: 250px;
          height: 100vh;
          background-color: #1a1a1a;
          color: #ffffff;
          display: flex;
          flex-direction: column;
          position: fixed;
          left: 0;
          top: 0;
        }

        .sidebar-header {
          padding: 20px;
          border-bottom: 1px solid #333;
        }

        .sidebar-title {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 0;
        }

        .sidebar-nav {
          flex: 1;
          overflow-y: auto;
          padding: 20px 0;
        }

        .sidebar-menu {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .sidebar-menu-item {
          margin-bottom: 4px;
        }

        .sidebar-menu-link {
          display: flex;
          align-items: center;
          padding: 12px 20px;
          color: #ffffff;
          text-decoration: none;
          transition: background-color 0.2s;
        }

        .sidebar-menu-link:hover {
          background-color: #333;
        }

        .sidebar-menu-link.active {
          background-color: #0070f3;
        }

        .sidebar-menu-icon {
          margin-right: 12px;
          font-size: 1.25rem;
        }

        .sidebar-menu-label {
          font-size: 0.95rem;
        }
      `}</style>
    </aside>
  );
}