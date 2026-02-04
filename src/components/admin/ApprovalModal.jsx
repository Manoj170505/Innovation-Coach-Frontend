import React from 'react';
import { X, UserCheck, Shield, UserX } from 'lucide-react';

const ApprovalModal = ({ user, onClose, onApprove, onReject }) => {
    const handleApprove = (role) => {
        onApprove(user.id, role);
        onClose();
    };

    const handleReject = () => {
        if (window.confirm(`Are you sure you want to reject ${user.name}? This will delete their account and send them a rejection email.`)) {
            onReject(user.id);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
            <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">User Approval</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                {/* User Info */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                            <span className="text-2xl font-bold text-green-500">
                                {user.name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">{user.name}</h3>
                            <p className="text-sm text-gray-400">{user.email}</p>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500">
                        Registered: {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                </div>

                {/* Requested Role Info */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
                    <div className="flex items-center gap-2 mb-3">
                        <h4 className="text-sm font-semibold text-white">Requested Access Level:</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.requestedRole === 'ADMIN'
                            ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                            : 'bg-blue-500/20 text-blue-400'
                            }`}>
                            {user.requestedRole || 'USER'}
                        </span>
                    </div>

                    {user.adminRequestReason && (
                        <div className="mt-3 p-4 bg-orange-500/5 border border-orange-500/20 rounded-xl">
                            <p className="text-xs font-semibold text-orange-400 mb-2">Admin Access Reason:</p>
                            <p className="text-sm text-white/80 leading-relaxed">{user.adminRequestReason}</p>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <p className="text-sm text-gray-400 mb-4">Choose an action for this user:</p>

                    {/* Approve as Admin */}
                    <button
                        onClick={() => handleApprove('ADMIN')}
                        className="w-full flex items-center gap-3 px-6 py-4 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-xl transition-all group"
                    >
                        <Shield className="w-5 h-5 text-purple-500" />
                        <div className="flex-1 text-left">
                            <p className="font-bold text-white group-hover:text-purple-400 transition-colors">Approve as Admin</p>
                            <p className="text-xs text-gray-400">Full access to manage users and posts</p>
                        </div>
                    </button>

                    {/* Approve as User */}
                    <button
                        onClick={() => handleApprove('USER')}
                        className="w-full flex items-center gap-3 px-6 py-4 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 rounded-xl transition-all group"
                    >
                        <UserCheck className="w-5 h-5 text-green-500" />
                        <div className="flex-1 text-left">
                            <p className="font-bold text-white group-hover:text-green-400 transition-colors">Approve as User</p>
                            <p className="text-xs text-gray-400">Standard access to create and share posts</p>
                        </div>
                    </button>

                    {/* Reject */}
                    <button
                        onClick={handleReject}
                        className="w-full flex items-center gap-3 px-6 py-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-xl transition-all group"
                    >
                        <UserX className="w-5 h-5 text-red-500" />
                        <div className="flex-1 text-left">
                            <p className="font-bold text-white group-hover:text-red-400 transition-colors">Reject Application</p>
                            <p className="text-xs text-gray-400">Send rejection email and remove account</p>
                        </div>
                    </button>
                </div>

                {/* Cancel Button */}
                <button
                    onClick={onClose}
                    className="w-full mt-4 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-gray-400"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ApprovalModal;
