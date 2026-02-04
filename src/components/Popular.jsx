import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import SkeletonCard from './SkeletonCard';
import EmptyState from './EmptyState';
import { getPopularPosts } from '../services/postService';
import { TrendingUp } from 'lucide-react';

const Popular = () => {
    const navigate = useNavigate();
    const [popular, setPopular] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPopularPosts();
    }, []);

    const fetchPopularPosts = async () => {
        try {
            setLoading(true);
            const response = await getPopularPosts();
            if (response.status === 'success') {
                setPopular(response.data);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load popular posts');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white">
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
                    <div className="flex flex-col space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                                Most <span className="text-green-500">Popular</span>
                            </h1>
                            <p className="text-gray-400 text-lg max-w-2xl">
                                Projects that create great Interactions!
                            </p>
                        </div>

                        <div className="flex flex-col space-y-6 mx-auto w-full">
                            {[1, 2, 3].map((i) => (
                                <SkeletonCard key={i} />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-green-500/30">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
                <div className="flex flex-col space-y-8">
                    <div className="space-y-4 animate-fade-in">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                            Most <span className="text-green-500">Popular</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl">
                            Projects that create great Interactions!
                        </p>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl animate-fade-in">
                            <p className="text-red-400 text-center">{error}</p>
                        </div>
                    )}

                    <div className="flex flex-col space-y-6 mx-auto w-full">
                        {popular.length === 0 ? (
                            <EmptyState
                                icon={<TrendingUp className="w-12 h-12 text-green-500" />}
                                title="No Popular Posts Yet"
                                description="Start engaging with posts by liking and commenting. The most popular posts will appear here!"
                                actionLabel="Explore Posts"
                                onAction={() => navigate('/userpage')}
                            />
                        ) : (
                            popular.map((post, index) => (
                                <div
                                    key={post.id}
                                    className="animate-fade-in"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <ProjectCard
                                        id={post.id}
                                        userid={post.author?.name || 'Unknown'}
                                        userProfilePic={post.author?.profilePic}
                                        title={post.title}
                                        description={post.description}
                                        likesCount={post._count?.likes || 0}
                                        dislikesCount={post._count?.dislikes || 0}
                                        onUpdate={fetchPopularPosts}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Popular;