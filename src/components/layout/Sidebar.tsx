import {
    BarChart3,
    Home,
    LogOut,
    Package,
    Settings,
    ShoppingCart,
    User
} from 'lucide-react';
import React from 'react';
import { usePosStore } from '../../stores/posStore';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const sidebarItems = [
  { id: 'pos', label: 'POS', icon: Home },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const { currentUser, logout, getCartItemCount } = usePosStore();
  const cartItemCount = getCartItemCount();

  const handleLogout = () => {
    try {
      logout();
      // In a real app, you might redirect to login page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold">POS System</h1>
        <p className="text-gray-400 text-sm">Point of Sale</p>
      </div>

      {/* User Info */}
      {currentUser && (
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-medium">{currentUser.name}</p>
              <p className="text-xs text-gray-400 capitalize">{currentUser.role}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors
                    ${isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {item.id === 'pos' && cartItemCount > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] h-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Cart Summary (only show on non-POS pages) */}
      {activeTab !== 'pos' && cartItemCount > 0 && (
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => onTabChange('pos')}
            className="w-full flex items-center justify-between p-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-4 h-4" />
              <span className="text-sm font-medium">Cart</span>
            </div>
            <span className="bg-green-500 text-white text-xs rounded-full px-2 py-1">
              {cartItemCount}
            </span>
          </button>
        </div>
      )}

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};