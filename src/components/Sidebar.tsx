import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderOpen, 
  FileText, 
  Package, 
  Share2, 
  ScrollText, 
  ShieldCheck, 
  BarChart3, 
  Users, 
  Settings 
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Cases', path: '/cases', icon: FolderOpen },
    { name: 'Documents', path: '/documents', icon: FileText },
    { name: 'Evidence', path: '/evidence', icon: Package },
    { name: 'Secure Sharing', path: '/secure-sharing', icon: Share2 },
    { name: 'Audit Trail', path: '/audit-trail', icon: ScrollText },
    { name: 'Security Center', path: '/security', icon: ShieldCheck },
    { name: 'Reports', path: '/reports', icon: BarChart3 },
    { name: 'Users & Roles', path: '/users', icon: Users },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-[250px] bg-white border-r border-gray-200 h-full flex flex-col hidden md:flex shrink-0 shadow-[4px_0_10px_rgba(0,0,0,0.02)]">
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-govt-blue border-l-4 border-govt-blue'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-govt-blue border-l-4 border-transparent'
                    }`
                  }
                >
                  <Icon size={20} className="mr-3" />
                  {item.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {user && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user.designation}
              </p>
              <p className="text-[10px] text-gray-400 uppercase mt-0.5 truncate">
                {user.department}
              </p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
