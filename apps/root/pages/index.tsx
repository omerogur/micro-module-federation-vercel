import NavigationApp from 'navigation/app';
import Sidebar from 'navigation/sidebar';
import Header from 'navigation/header';
import Footer from 'navigation/footer';
import Page from 'content/page';
import ContentApp from 'content/app';

export default function Home() {
  return (
    <div className="app-container">
      {/* Sidebar with Footer */}
      <div className="sidebar-container">
        <NavigationApp Component={Sidebar} />
        <NavigationApp Component={Footer} />
      </div>

      {/* Main Content Area */}
      <div className="main-container">
        {/* Header */}
        <div className="header-container">
          <NavigationApp Component={Header} />
        </div>

        {/* Content */}
        <div className="content-container">
          <ContentApp Component={Page} />
        </div>
      </div>

      <style jsx>{`
        .app-container {
          display: flex;
          height: 100vh;
          overflow: hidden;
        }

        .sidebar-container {
          width: 250px;
          height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: #1a1a1a;
          position: fixed;
          left: 0;
          top: 0;
        }

        .sidebar-container > :global(div:first-child) {
          flex: 1;
          overflow-y: auto;
        }

        .main-container {
          flex: 1;
          margin-left: 250px;
          display: flex;
          flex-direction: column;
          height: 100vh;
        }

        .header-container {
          flex-shrink: 0;
          border-bottom: 1px solid #e0e0e0;
          background-color: #ffffff;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .content-container {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          background-color: #f5f5f5;
        }
      `}</style>
    </div>
  );
}

export const getServerSideProps = () => {
  return {
    props: {},
  };
};