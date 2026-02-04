import React, { useState, useEffect } from 'react';
import { getAllPostsForAdmin, updatePostState } from '../../services/adminService';
import { CheckCircle, XCircle, Search, Eye } from 'lucide-react';

const PostManagement = () => {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState('Pending'); // Pending, Approved, Rejected
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await getAllPostsForAdmin();
            if (response.status === 'success') {
                setPosts(response.data);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load posts');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateState = async (postId, state) => {
        try {
            await updatePostState(postId, state);
            fetchPosts(); // Refresh the list
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to update post state');
        }
    };

    const filteredPosts = posts
        .filter(post => post.state === filter)
        .filter(post =>
            post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.description.toLowerCase().includes(search.toLowerCase())
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
                    <h1 className="text-4xl font-bold mb-2">Post Management</h1>
                    <p className="text-gray-400">Review and moderate user posts</p>
                </div>

                {/* Filters and Search */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilter('Pending')}
                            className={`px-6 py-3 rounded-full transition-all ${filter === 'Pending'
                                ? 'bg-orange-500 text-white'
                                : 'bg-white/5 hover:bg-white/10'
                                }`}
                        >
                            Pending
                        </button>
                        <button
                            onClick={() => setFilter('Approved')}
                            className={`px-6 py-3 rounded-full transition-all ${filter === 'Approved'
                                ? 'bg-green-500 text-white'
                                : 'bg-white/5 hover:bg-white/10'
                                }`}
                        >
                            Approved
                        </button>
                        <button
                            onClick={() => setFilter('Rejected')}
                            className={`px-6 py-3 rounded-full transition-all ${filter === 'Rejected'
                                ? 'bg-red-500 text-white'
                                : 'bg-white/5 hover:bg-white/10'
                                }`}
                        >
                            Rejected
                        </button>
                    </div>

                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search posts..."
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

                {/* Posts Grid */}
                <div className="grid gap-6">
                    {filteredPosts.length === 0 ? (
                        <div className="text-center py-12 text-gray-400">
                            No {filter.toLowerCase()} posts found
                        </div>
                    ) : (
                        filteredPosts.map((post) => (
                            <div key={post.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                                        <p className="text-gray-400 mb-2">{post.description}</p>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span>By: {post.author?.name || 'Unknown'}</span>
                                            <span>•</span>
                                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                            <span>•</span>
                                            <span className={`px-2 py-1 rounded-full text-xs ${post.visibility === 'public'
                                                ? 'bg-blue-500/20 text-blue-400'
                                                : 'bg-gray-500/20 text-gray-400'
                                                }`}>
                                                {post.visibility}
                                            </span>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${post.state === 'Approved'
                                        ? 'bg-green-500/20 text-green-400'
                                        : post.state === 'Rejected'
                                            ? 'bg-red-500/20 text-red-400'
                                            : 'bg-orange-500/20 text-orange-400'
                                        }`}>
                                        {post.state}
                                    </span>
                                </div>

                                {post.state === 'Pending' && (
                                    <div className="flex gap-3 mt-4">
                                        <button
                                            onClick={() => handleUpdateState(post.id, 'Approved')}
                                            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors text-sm font-semibold"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleUpdateState(post.id, 'Rejected')}
                                            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors text-sm font-semibold"
                                        >
                                            <XCircle className="w-4 h-4" />
                                            Reject
                                        </button>
                                        <button
                                            onClick={() => setSelectedPost(post)}
                                            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm font-semibold"
                                        >
                                            <Eye className="w-4 h-4" />
                                            View Details
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {/* Post Detail Modal */}
                {selectedPost && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setSelectedPost(null)}>
                        <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                            <h2 className="text-2xl font-bold mb-4">{selectedPost.title}</h2>
                            <p className="text-gray-400 mb-4">{selectedPost.description}</p>
                            <div className="prose prose-invert max-w-none">
                                <p className="text-gray-300 whitespace-pre-wrap">{selectedPost.content}</p>
                            </div>
                            <button
                                onClick={() => setSelectedPost(null)}
                                className="mt-6 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostManagement;
