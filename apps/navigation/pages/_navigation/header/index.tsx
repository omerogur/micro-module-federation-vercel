export default function Header(): React.JSX.Element {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="page-title">Dashboard</h1>
        
        <div className="header-actions">
          <button className="notification-btn">
            <span className="notification-icon">🔔</span>
            <span className="notification-badge">3</span>
          </button>
          
          <div className="user-menu">
            <img 
              src="/placeholder-user.jpg" 
              alt="User" 
              className="user-avatar"
            />
            <span className="user-name">John Doe</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .app-header {
          height: 64px;
          background-color: #ffffff;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          padding: 0 24px;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .page-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .notification-btn {
          position: relative;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          transition: background-color 0.2s;
        }

        .notification-btn:hover {
          background-color: #f0f0f0;
        }

        .notification-icon {
          font-size: 1.25rem;
        }

        .notification-badge {
          position: absolute;
          top: 4px;
          right: 4px;
          background-color: #ff4444;
          color: white;
          font-size: 0.75rem;
          padding: 2px 6px;
          border-radius: 10px;
          font-weight: bold;
        }

        .user-menu {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          padding: 8px 12px;
          border-radius: 8px;
          transition: background-color 0.2s;
        }

        .user-menu:hover {
          background-color: #f0f0f0;
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
        }

        .user-name {
          font-size: 0.875rem;
          font-weight: 500;
          color: #333;
        }
      `}</style>
    </header>
  );
}

export const getServerSideProps = () => {
  return {
    props: {},
  };
};