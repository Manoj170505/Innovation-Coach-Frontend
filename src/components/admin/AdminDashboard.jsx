import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSystemStats } from '../../services/adminService';
import { Users, FileText, Clock, CheckCircle } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalPosts: 0,
        pendingApprovals: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await getSystemStats();
            if (response.status === 'success') {
                setStats(response.data);
            }
        } catch (err) {
            console.error('Failed to fetch stats:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
                    <p className="text-gray-400">Manage users, posts, and system statistics</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <Users className="w-10 h-10 text-blue-500" />
                            <span className="text-3xl font-bold">{stats.totalUsers}</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-1">Total Users</h3>
                        <p className="text-gray-400 text-sm">Registered users in the system</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <FileText className="w-10 h-10 text-green-500" />
                            <span className="text-3xl font-bold">{stats.totalPosts}</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-1">Total Posts</h3>
                        <p className="text-gray-400 text-sm">All posts created by users</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <Clock className="w-10 h-10 text-orange-500" />
                            <span className="text-3xl font-bold">{stats.pendingApprovals}</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-1">Pending Approvals</h3>
                        <p className="text-gray-400 text-sm">Posts waiting for review</p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link to="/admin/users" className="bg-linear-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-2xl p-8 hover:from-blue-500/30 hover:to-blue-600/30 transition-all group">
                        <Users className="w-12 h-12 text-blue-500 mb-4" />
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">User Management</h3>
                        <p className="text-gray-400">Approve or manage user accounts</p>
                    </Link>

                    <Link to="/admin/posts" className="bg-linear-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-2xl p-8 hover:from-green-500/30 hover:to-green-600/30 transition-all group">
                        <FileText className="w-12 h-12 text-green-500 mb-4" />
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-green-400 transition-colors">Post Management</h3>
                        <p className="text-gray-400">Review and moderate user posts</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
