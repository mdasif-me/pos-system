import React, { useState } from 'react';
import { InventoryPage, POSPage, ReportsPage, SettingsPage } from '../../pages';
import { Sidebar } from './Sidebar';

export const MainLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('pos');

  const renderContent = () => {
    switch (activeTab) {
      case 'pos':
        return <POSPage />;
      case 'inventory':
        return <InventoryPage />;
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <POSPage />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};