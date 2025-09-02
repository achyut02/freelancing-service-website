import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  UserCheck,
  TrendingUp,
  DollarSign,
  Calendar,
  Star,
  AlertCircle,
  Settings,
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  XCircle,
  Eye,
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'providers', label: 'Providers', icon: UserCheck },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const stats = [
    { label: 'Total Users', value: '12,540', change: '+8.2%', icon: Users, color: 'text-blue-600' },
    { label: 'Service Providers', value: '3,240', change: '+12.5%', icon: UserCheck, color: 'text-green-600' },
    { label: 'Total Bookings', value: '8,456', change: '+15.3%', icon: Calendar, color: 'text-purple-600' },
    { label: 'Revenue', value: '$124,580', change: '+9.7%', icon: DollarSign, color: 'text-orange-600' },
  ];

  const pendingProviders = [
    {
      id: '1',
      businessName: 'Quick Fix Plumbing',
      owner: 'John Smith',
      category: 'Home Services',
      location: 'New York, NY',
      submittedAt: '2025-01-10',
      status: 'pending',
    },
    {
      id: '2',
      businessName: 'Healthy Living Gym',
      owner: 'Sarah Johnson',
      category: 'Fitness',
      location: 'Los Angeles, CA',
      submittedAt: '2025-01-09',
      status: 'pending',
    },
    {
      id: '3',
      businessName: 'City Taxi Service',
      owner: 'Mike Davis',
      category: 'Transportation',
      location: 'Chicago, IL',
      submittedAt: '2025-01-08',
      status: 'pending',
    },
  ];

  const recentActivity = [
    { type: 'user_signup', message: 'New user registered: emily.chen@email.com', time: '2 minutes ago' },
    { type: 'booking', message: 'Booking completed: House Cleaning Service', time: '15 minutes ago' },
    { type: 'provider_approved', message: 'Provider approved: Clean Pro Services', time: '1 hour ago' },
    { type: 'review', message: 'New 5-star review received', time: '2 hours ago' },
    { type: 'payment', message: 'Payment processed: $125.00', time: '3 hours ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your service provider platform</p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg p-2 border border-gray-100">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                      selectedTab === tab.id
                        ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {selectedTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {stats.map((stat) => {
                const IconComponent = stat.icon;
                return (
                  <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                        <p className={`text-sm ${stat.color} mt-1`}>
                          {stat.change} from last month
                        </p>
                      </div>
                      <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10`}>
                        <IconComponent className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pending Approvals */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-orange-500" />
                    Pending Approvals ({pendingProviders.length})
                  </h2>
                </div>
                <div className="space-y-4">
                  {pendingProviders.map((provider) => (
                    <div
                      key={provider.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{provider.businessName}</h3>
                        <p className="text-gray-600 text-sm">
                          {provider.owner} • {provider.category}
                        </p>
                        <p className="text-gray-500 text-xs">{provider.location}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 text-sm">{activity.message}</p>
                        <p className="text-gray-500 text-xs">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {selectedTab === 'providers' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100"
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-xl font-bold text-gray-900">Service Providers</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search providers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600">Provider management interface would go here...</p>
            </div>
          </motion.div>
        )}

        {['users', 'bookings', 'settings'].includes(selectedTab) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4 capitalize">{selectedTab}</h2>
            <p className="text-gray-600">
              This section is under development. The {selectedTab} management interface will be available soon.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;