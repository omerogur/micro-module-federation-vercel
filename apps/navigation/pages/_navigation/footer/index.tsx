export default function Footer(): React.JSX.Element {
  return (
    <footer className="p-5 border-t border-footer-border bg-footer-bg text-footer-text text-center">
      <p className="m-0 text-sm">© 2025 Microfrontend App. All rights reserved.</p>
    </footer>
  );
}

export const getServerSideProps = () => {
  return {
    props: {},
  };
};