import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Sidebar() {
  const router = useRouter();

  const menuItems = [
    { path: '/', label: 'Ana Sayfa', icon: '🏠' },
  ];

  return (
    <aside className="w-64 h-screen bg-nav-bg text-nav-text flex flex-col fixed left-0 top-0 border-r border-nav-border">
      <div className="p-5 border-b border-nav-border">
        <h2 className="text-xl font-bold m-0">Microfrontend App</h2>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-5">
        <ul className="list-none p-0 m-0">
          {menuItems.map((item) => (
            <li key={item.path} className="mb-1">
              <Link 
                href={item.path}
                className={`flex items-center px-5 py-3 text-nav-text no-underline transition-colors hover:bg-nav-hover ${
                  router.pathname === item.path ? 'bg-nav-active text-primary' : ''
                }`}
              >
                <span className="mr-3 text-xl">{item.icon}</span>
                <span className="text-base">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}