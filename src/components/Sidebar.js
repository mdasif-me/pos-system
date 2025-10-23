import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Database, Package, Settings } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      path: '/cloud-db',
      icon: Database,
      label: 'Cloud DB',
      description: 'Product Database'
    },
    {
      path: '/stock',
      icon: Package,
      label: 'Stock',
      description: 'Inventory Management'
    }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">POS System</h1>
        <p className="text-sm text-gray-600">Business Management</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary-50 text-primary-700 border border-primary-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center w-full p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
          <Settings className="w-5 h-5 mr-3" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;