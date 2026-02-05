import React, { useState } from 'react';
import { Lock, X } from 'lucide-react';

const AdminTokenModal = ({ onSubmit, onClose, actionType }) => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!password) {
            setError('Password is required');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await onSubmit(password);
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                            <Lock className="w-6 h-6 text-orange-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">Admin Verification</h2>
                            <p className="text-sm text-gray-400">Enter your password to {actionType}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your admin password"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                            autoFocus
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                            <p className="text-sm text-red-400">{error}</p>
                        </div>
                    )}

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors font-semibold text-white"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 rounded-lg transition-colors font-semibold text-white"
                        >
                            {loading ? 'Verifying...' : 'Confirm'}
                        </button>
                    </div>
                </form>

                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <p className="text-xs text-blue-300">
                        <strong>Security Note:</strong> Admin token is required for sensitive operations and expires in 15 minutes.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminTokenModal;
