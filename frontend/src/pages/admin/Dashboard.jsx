import React, { useState, useEffect } from 'react';
import { Users, Calendar, MapPin, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../utils/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total_volunteers: 0,
    today_registrations: 0,
    total_cities: 0,
    active_applications: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/admin/dashboard');
      if (response.data.success) {
        setStats(response.data.stats);
        setRecentActivity(response.data.recent_activity);
      }
    } catch (error) {
      console.error('Error fetching dashboard data', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Total Volunteers', value: stats.total_volunteers, icon: <Users size={24} className="text-blue-600" />, bg: 'bg-blue-100' },
    { title: "Today's Registrations", value: stats.today_registrations, icon: <Calendar size={24} className="text-green-600" />, bg: 'bg-green-100' },
    { title: 'Total Cities', value: stats.total_cities, icon: <MapPin size={24} className="text-purple-600" />, bg: 'bg-purple-100' },
    { title: 'Active Applications', value: stats.active_applications, icon: <CheckCircle size={24} className="text-orange-600" />, bg: 'bg-orange-100' },
  ];

  if (loading) {
    return <div className="animate-pulse flex space-x-4">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${card.bg}`}>
              {card.icon}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500">{card.title}</p>
              <h3 className="text-3xl font-black text-gray-900 mt-1">{card.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Recent Registrations</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {recentActivity.length > 0 ? (
            recentActivity.map(activity => (
              <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                  {activity.full_name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-gray-900">{activity.full_name}</p>
                      <p className="text-sm text-gray-500">{activity.preferred_area} • {activity.city}, {activity.state}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock size={12} />
                      {new Date(activity.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">No recent activity.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
