import React, { useState, useEffect } from 'react';
import { getAllUsers, getPendingUsers, approveUser, rejectUser, deleteUser } from '../../services/adminService';
import { CheckCircle, XCircle, Search, Trash2 } from 'lucide-react';
import ApprovalModal from './ApprovalModal';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('all'); // all, active, pending
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, [filter]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = filter === 'pending'
                ? await getPendingUsers()
                : await getAllUsers();

            if (response.status === 'success') {
                setUsers(response.data);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const handleApproveClick = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleApprove = async (userId, role) => {
        try {
            await approveUser(userId, role);
            fetchUsers(); // Refresh the list
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to approve user');
        }
    };

    const handleReject = async (userId) => {
        try {
            await rejectUser(userId);
            fetchUsers(); // Refresh the list
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to reject user');
        }
    };

    const handleDelete = async (userId, userName) => {
        if (window.confirm(`Are you sure you want to permanently delete ${userName}? This action cannot be undone.`)) {
            try {
                await deleteUser(userId);
                fetchUsers(); // Refresh the list
            } catch (err) {
                alert(err.response?.data?.message || 'Failed to delete user');
            }
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

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
                    <h1 className="text-4xl font-bold mb-2">User Management</h1>
                    <p className="text-gray-400">Manage and approve user accounts</p>
                </div>

                {/* Filters and Search */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-6 py-3 rounded-full transition-all ${filter === 'all'
                                ? 'bg-green-500 text-white'
                                : 'bg-white/5 hover:bg-white/10'
                                }`}
                        >
                            All Users
                        </button>
                        <button
                            onClick={() => setFilter('pending')}
                            className={`px-6 py-3 rounded-full transition-all ${filter === 'pending'
                                ? 'bg-orange-500 text-white'
                                : 'bg-white/5 hover:bg-white/10'
                                }`}
                        >
                            Pending
                        </button>
                    </div>

                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                        />
                    </div>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                        <p className="text-red-400 text-center">{error}</p>
                    </div>
                )}

                {/* Users Table */}
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-white/5">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Role</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Requested Role</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Posts</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center text-gray-400">
                                            No users found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4">{user.name}</td>
                                            <td className="px-6 py-4 text-gray-400">{user.email}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.role === 'ADMIN'
                                                    ? 'bg-purple-500/20 text-purple-400'
                                                    : 'bg-blue-500/20 text-blue-400'
                                                    }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.requestedRole === 'ADMIN'
                                                        ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                                                        : 'bg-blue-500/20 text-blue-400'
                                                        }`}>
                                                        {user.requestedRole || 'USER'}
                                                    </span>
                                                    {user.adminRequestReason && (
                                                        <div className="group relative">
                                                            <i className="bi bi-info-circle text-orange-400 cursor-help"></i>
                                                            <div className="absolute left-0 top-6 hidden group-hover:block z-10 w-64 p-3 bg-gray-900 border border-white/20 rounded-lg shadow-xl">
                                                                <p className="text-xs text-gray-300 font-medium mb-1">Admin Request Reason:</p>
                                                                <p className="text-xs text-white/80">{user.adminRequestReason}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.isActive
                                                    ? 'bg-green-500/20 text-green-400'
                                                    : 'bg-orange-500/20 text-orange-400'
                                                    }`}>
                                                    {user.isActive ? 'Active' : 'Pending'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-400">{user._count?.posts || 0}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    {!user.isActive && (
                                                        <button
                                                            onClick={() => handleApproveClick(user)}
                                                            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors text-sm font-semibold"
                                                        >
                                                            <CheckCircle className="w-4 h-4" />
                                                            Approve
                                                        </button>
                                                    )}
                                                    {user.isActive && (
                                                        <button
                                                            onClick={() => handleDelete(user.id, user.name)}
                                                            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg transition-colors text-sm font-semibold text-red-400"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                            Delete
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Approval Modal */}
            {showModal && selectedUser && (
                <ApprovalModal
                    user={selectedUser}
                    onClose={() => {
                        setShowModal(false);
                        setSelectedUser(null);
                    }}
                    onApprove={handleApprove}
                    onReject={handleReject}
                />
            )}
        </div>
    );
};

export default UserManagement;
