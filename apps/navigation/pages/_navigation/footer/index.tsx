export default function Footer(): React.JSX.Element {
  return (
    <footer className="sidebar-footer">
      <p className="copyright-text">© 2025 Microfrontend App. All rights reserved.</p>
      
      <style jsx>{`
        .sidebar-footer {
          padding: 20px;
          border-top: 1px solid #333;
          background-color: #1a1a1a;
          color: #666;
          text-align: center;
        }

        .copyright-text {
          margin: 0;
          font-size: 0.875rem;
        }
      `}</style>
    </footer>
  );
}

export const getServerSideProps = () => {
  return {
    props: {},
  };
};