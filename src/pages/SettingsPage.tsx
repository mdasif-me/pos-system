import { Bell, Palette, Save, Store, User } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../components/ui/Button';
import { Card, CardHeader } from '../components/ui/Card';
import { Input, Select } from '../components/ui/Input';
import { usePosStore } from '../stores/posStore';

export const SettingsPage: React.FC = () => {
  const { currentUser, setCurrentUser, categories, addCategory } = usePosStore();
  
  const [userSettings, setUserSettings] = useState({
    name: currentUser?.name || 'Admin User',
    email: currentUser?.email || 'admin@pos.com',
    role: currentUser?.role || 'admin',
  });

  const [storeSettings, setStoreSettings] = useState({
    storeName: 'My POS Store',
    address: '123 Main St, City, State',
    phone: '+1 (555) 123-4567',
    taxRate: '8',
    currency: 'USD',
  });

  const [newCategory, setNewCategory] = useState({
    name: '',
    color: '#3B82F6',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSaveUserSettings = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would make an API call
      if (currentUser) {
        setCurrentUser({
          ...currentUser,
          name: userSettings.name,
          email: userSettings.email,
          role: userSettings.role as 'admin' | 'cashier',
        });
      }
      toast.success('User settings saved successfully');
    } catch (error) {
      toast.error('Failed to save user settings');
      console.error('Save user settings error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveStoreSettings = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Store settings saved successfully');
    } catch (error) {
      toast.error('Failed to save store settings');
      console.error('Save store settings error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.name.trim()) {
      toast.error('Category name is required');
      return;
    }

    try {
      addCategory({
        name: newCategory.name.trim(),
        color: newCategory.color,
      });
      
      setNewCategory({ name: '', color: '#3B82F6' });
      toast.success('Category added successfully');
    } catch (error) {
      toast.error('Failed to add category');
      console.error('Add category error:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your POS system configuration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Settings */}
        <Card>
          <CardHeader 
            title="User Settings" 
            action={
              <User className="w-5 h-5 text-gray-400" />
            }
          />
          
          <div className="space-y-4">
            <Input
              label="Full Name"
              value={userSettings.name}
              onChange={(e) => setUserSettings(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your full name"
            />
            
            <Input
              label="Email Address"
              type="email"
              value={userSettings.email}
              onChange={(e) => setUserSettings(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Enter your email"
            />
            
            <Select
              label="Role"
              value={userSettings.role}
              onChange={(e) => setUserSettings(prev => ({ ...prev, role: e.target.value as 'admin' | 'cashier' }))}
              options={[
                { value: 'admin', label: 'Administrator' },
                { value: 'cashier', label: 'Cashier' },
              ]}
            />
            
            <Button 
              onClick={handleSaveUserSettings}
              loading={isLoading}
              className="w-full"
            >
              <Save className="w-4 h-4 mr-2" />
              Save User Settings
            </Button>
          </div>
        </Card>

        {/* Store Settings */}
        <Card>
          <CardHeader 
            title="Store Settings" 
            action={
              <Store className="w-5 h-5 text-gray-400" />
            }
          />
          
          <div className="space-y-4">
            <Input
              label="Store Name"
              value={storeSettings.storeName}
              onChange={(e) => setStoreSettings(prev => ({ ...prev, storeName: e.target.value }))}
              placeholder="Enter store name"
            />
            
            <Input
              label="Address"
              value={storeSettings.address}
              onChange={(e) => setStoreSettings(prev => ({ ...prev, address: e.target.value }))}
              placeholder="Enter store address"
            />
            
            <Input
              label="Phone Number"
              value={storeSettings.phone}
              onChange={(e) => setStoreSettings(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="Enter phone number"
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Tax Rate (%)"
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={storeSettings.taxRate}
                onChange={(e) => setStoreSettings(prev => ({ ...prev, taxRate: e.target.value }))}
                placeholder="8.0"
              />
              
              <Select
                label="Currency"
                value={storeSettings.currency}
                onChange={(e) => setStoreSettings(prev => ({ ...prev, currency: e.target.value }))}
                options={[
                  { value: 'USD', label: 'USD ($)' },
                  { value: 'EUR', label: 'EUR (€)' },
                  { value: 'GBP', label: 'GBP (£)' },
                ]}
              />
            </div>
            
            <Button 
              onClick={handleSaveStoreSettings}
              loading={isLoading}
              className="w-full"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Store Settings
            </Button>
          </div>
        </Card>
      </div>

      {/* Categories Management */}
      <Card>
        <CardHeader 
          title="Product Categories" 
          action={
            <Palette className="w-5 h-5 text-gray-400" />
          }
        />
        
        <div className="space-y-6">
          {/* Existing Categories */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Current Categories</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {categories.map((category) => (
                <div 
                  key={category.id}
                  className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="font-medium text-gray-900">{category.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Add New Category */}
          <div className="border-t pt-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Add New Category</h4>
            <div className="flex space-x-3">
              <div className="flex-1">
                <Input
                  placeholder="Category name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="w-20">
                <input
                  type="color"
                  value={newCategory.color}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, color: e.target.value }))}
                  className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                />
              </div>
              <Button onClick={handleAddCategory}>
                Add
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader 
          title="Notifications" 
          action={
            <Bell className="w-5 h-5 text-gray-400" />
          }
        />
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Low Stock Alerts</h4>
              <p className="text-sm text-gray-500">Get notified when products are running low</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Transaction Notifications</h4>
              <p className="text-sm text-gray-500">Show notifications for completed transactions</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Email Reports</h4>
              <p className="text-sm text-gray-500">Receive daily sales reports via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </Card>
    </div>
  );
};