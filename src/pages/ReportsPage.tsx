import { BarChart3, DollarSign, Package, TrendingUp } from 'lucide-react';
import React from 'react';
import { Card, CardHeader } from '../components/ui/Card';
import { usePosStore } from '../stores/posStore';

export const ReportsPage: React.FC = () => {
  const { products, cart } = usePosStore();

  // Mock data for demonstration - in a real app, this would come from a database
  const todaysSales = 1247.50;
  const totalTransactions = 23;
  const averageOrderValue = todaysSales / totalTransactions;
  const topSellingProducts = products.slice(0, 5);

  const stats = [
    {
      title: "Today's Sales",
      value: `$${todaysSales.toFixed(2)}`,
      icon: DollarSign,
      change: '+12.5%',
      changeType: 'positive' as 'positive' | 'negative' | 'neutral',
    },
    {
      title: 'Transactions',
      value: totalTransactions.toString(),
      icon: BarChart3,
      change: '+8.2%',
      changeType: 'positive' as 'positive' | 'negative' | 'neutral',
    },
    {
      title: 'Average Order',
      value: `$${averageOrderValue.toFixed(2)}`,
      icon: TrendingUp,
      change: '+3.1%',
      changeType: 'positive' as 'positive' | 'negative' | 'neutral',
    },
    {
      title: 'Products',
      value: products.length.toString(),
      icon: Package,
      change: '0%',
      changeType: 'neutral' as 'positive' | 'negative' | 'neutral',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600">Track your business performance and insights</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.title}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stat.value}
                        </div>
                        <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.changeType === 'positive' ? 'text-green-600' :
                          stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-500'
                        }`}>
                          {stat.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Products */}
        <Card>
          <CardHeader title="Top Selling Products" />
          <div className="space-y-4">
            {topSellingProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {Math.floor(Math.random() * 50) + 10} sold
                  </div>
                  <div className="text-sm text-gray-500">
                    ${(product.price * (Math.floor(Math.random() * 50) + 10)).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader title="Recent Activity" />
          <div className="space-y-4">
            {[
              { action: 'Sale completed', amount: '$45.60', time: '2 minutes ago' },
              { action: 'Product added', item: 'Croissant', time: '15 minutes ago' },
              { action: 'Sale completed', amount: '$23.40', time: '23 minutes ago' },
              { action: 'Stock updated', item: 'Coffee - Espresso', time: '1 hour ago' },
              { action: 'Sale completed', amount: '$67.80', time: '1 hour ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{activity.action}</h4>
                  <p className="text-sm text-gray-500">
                    {'amount' in activity ? activity.amount : activity.item}
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Sales Chart Placeholder */}
      <Card>
        <CardHeader title="Sales Chart" subtitle="Coming soon - Chart visualization" />
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Sales Analytics Chart</h3>
            <p className="text-gray-500">Advanced charting features coming soon</p>
          </div>
        </div>
      </Card>
    </div>
  );
};