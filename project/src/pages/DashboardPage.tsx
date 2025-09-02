import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, Star, Users, TrendingUp, Bell, Settings } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Bookings', value: '24', icon: Calendar, change: '+12%', color: 'text-blue-600' },
    { label: 'Average Rating', value: '4.8', icon: Star, change: '+0.2', color: 'text-yellow-500' },
    { label: 'Active Clients', value: '18', icon: Users, change: '+3', color: 'text-green-600' },
    { label: 'Revenue', value: '$2,450', icon: TrendingUp, change: '+8%', color: 'text-purple-600' },
  ];

  const recentBookings = [
    {
      id: '1',
      client: 'John Doe',
      service: 'House Cleaning',
      date: '2025-01-15',
      time: '10:00 AM',
      status: 'confirmed',
    },
    {
      id: '2',
      client: 'Sarah Wilson',
      service: 'Plumbing Repair',
      date: '2025-01-16',
      time: '2:30 PM',
      status: 'pending',
    },
    {
      id: '3',
      client: 'Mike Johnson',
      service: 'Electrical Work',
      date: '2025-01-17',
      time: '9:00 AM',
      status: 'completed',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.user_metadata?.full_name || user?.email}!
              </h1>
              <p className="mt-2 text-gray-600">Here's what's happening with your services today.</p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-200">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => {
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
          {/* Recent Bookings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Bookings</h2>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{booking.client}</h3>
                    <p className="text-gray-600 text-sm">{booking.service}</p>
                    <p className="text-gray-500 text-xs">
                      {booking.date} at {booking.time}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : booking.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full text-left p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-200">
                <h3 className="font-semibold text-blue-900">Update Your Profile</h3>
                <p className="text-blue-700 text-sm">Keep your information current</p>
              </button>
              <button className="w-full text-left p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-md transition-all duration-200">
                <h3 className="font-semibold text-green-900">Manage Services</h3>
                <p className="text-green-700 text-sm">Add or edit your service offerings</p>
              </button>
              <button className="w-full text-left p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100 hover:shadow-md transition-all duration-200">
                <h3 className="font-semibold text-purple-900">View Analytics</h3>
                <p className="text-purple-700 text-sm">Track your performance metrics</p>
              </button>
              <button className="w-full text-left p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100 hover:shadow-md transition-all duration-200">
                <h3 className="font-semibold text-orange-900">Customer Reviews</h3>
                <p className="text-orange-700 text-sm">Read and respond to feedback</p>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;