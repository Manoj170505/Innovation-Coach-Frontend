import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import SkeletonCard from './SkeletonCard';
import EmptyState from './EmptyState';
import { getAllPosts } from '../services/postService';
import { Lightbulb } from 'lucide-react';

const Userpage = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await getAllPosts();
            if (response.status === 'success') {
                // Filter to show only public and approved posts
                const publicApprovedPosts = response.data.filter(
                    post => post.visibility === 'public' && post.state === 'Approved'
                );
                setProjects(publicApprovedPosts);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load posts');
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
                                Innovative <span className="text-green-500">Community</span>
                            </h1>
                            <p className="text-gray-400 text-lg max-w-2xl">
                                A place for innovators to share their ideas and collaborate with others.
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
                            Innovative <span className="text-green-500">Community</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl">
                            A place for innovators to share their ideas and collaborate with others.
                        </p>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl animate-fade-in">
                            <p className="text-red-400 text-center">{error}</p>
                        </div>
                    )}

                    <div className="flex flex-col space-y-6 mx-auto w-full">
                        {projects.length === 0 ? (
                            <EmptyState
                                icon={<Lightbulb className="w-12 h-12 text-green-500" />}
                                title="No Posts Yet"
                                description="Be the first to share your innovative idea with the community! Your creativity could inspire others."
                                actionLabel="Share Your Idea"
                                onAction={() => navigate('/post')}
                            />
                        ) : (
                            projects.map((project, index) => (
                                <div
                                    key={project.id}
                                    className="animate-fade-in"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <ProjectCard
                                        id={project.id}
                                        userid={project.author?.name || 'Unknown'}
                                        userProfilePic={project.author?.profilePic}
                                        title={project.title}
                                        description={project.description}
                                        likesCount={project._count?.likes || 0}
                                        dislikesCount={project._count?.dislikes || 0}
                                        onUpdate={fetchPosts}
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

export default Userpage;
