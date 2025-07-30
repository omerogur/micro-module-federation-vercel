import dynamic from 'next/dynamic';

const ThemeSwitcher = dynamic(() => import('../../../../../packages/ui-components/ThemeSwitcher'), {
  ssr: false,
});

export default function Header(): React.JSX.Element {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-header-border bg-header-bg backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <h1 className="text-2xl font-semibold text-header-text">Dashboard</h1>
        
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          
          <button className="relative p-2 rounded-md text-header-text hover:bg-nav-hover transition-colors">
            <span className="text-xl">🔔</span>
            <span className="absolute top-1 right-1 bg-error text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
              3
            </span>
          </button>
          
          <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-nav-hover cursor-pointer transition-colors">
            <img 
              src="/placeholder-user.jpg" 
              alt="User" 
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-header-text">John Doe</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export const getServerSideProps = () => {
  return {
    props: {},
  };
};