import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getPostById, likePost, dislikePost } from '../services/postService';

const Detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [likesCount, setLikesCount] = useState(0);
    const [dislikesCount, setDislikesCount] = useState(0);
    const [isLiking, setIsLiking] = useState(false);
    const [isDisliking, setIsDisliking] = useState(false);

    useEffect(() => {
        fetchPostDetails();
    }, [id]);

    const fetchPostDetails = async () => {
        try {
            setLoading(true);
            const response = await getPostById(id);
            if (response.status === 'success') {
                setProject(response.data);
                setLikesCount(response.data._count?.likes || 0);
                setDislikesCount(response.data._count?.dislikes || 0);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load post details');
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async () => {
        if (isLiking || !id) return;

        try {
            setIsLiking(true);
            await likePost(id);
            // Optimistically update the UI
            setLikesCount(prev => prev > 0 ? prev - 1 : prev + 1);
            // Optionally refresh to get accurate counts
            await fetchPostDetails();
        } catch (error) {
            console.error('Failed to like post:', error);
        } finally {
            setIsLiking(false);
        }
    };

    const handleDislike = async () => {
        if (isDisliking || !id) return;

        try {
            setIsDisliking(true);
            await dislikePost(id);
            // Optimistically update the UI
            setDislikesCount(prev => prev > 0 ? prev - 1 : prev + 1);
            // Optionally refresh to get accurate counts
            await fetchPostDetails();
        } catch (error) {
            console.error('Failed to dislike post:', error);
        } finally {
            setIsDisliking(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold">{error || 'Project not found'}</h2>
                    <button onClick={() => navigate(-1)} className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-full transition-colors">
                        Go back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-green-500/30 pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Navigation */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group px-4 py-2 bg-white/5 rounded-full border border-white/10"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back</span>
                    </button>
                </div>

                {/* Project Identity */}
                <div className="flex items-center gap-4 mb-8">
                    <img
                        className='rounded-full w-12 h-12 object-cover border border-white/10'
                        src={project.author?.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(project.author?.name || 'User')}&background=10b981&color=fff&size=128`}
                        alt={`${project.author?.name}'s profile`}
                        onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(project.author?.name || 'User')}&background=10b981&color=fff&size=128`;
                        }}
                    />
                    <div>
                        <p className="font-bold text-lg">{project.author?.name || "Anonymous"}</p>
                        <p className="text-sm text-white/40">Posted {new Date(project.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="ml-auto flex gap-2">
                        {project.visibility && (
                            <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-xs font-bold border border-blue-500/20 uppercase tracking-wider">
                                {project.visibility}
                            </span>
                        )}
                        {project.state && (
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${project.state === 'Approved'
                                ? 'bg-green-500/10 text-green-500 border-green-500/20'
                                : project.state === 'Rejected'
                                    ? 'bg-red-500/10 text-red-500 border-red-500/20'
                                    : 'bg-orange-500/10 text-orange-500 border-orange-500/20'
                                }`}>
                                {project.state}
                            </span>
                        )}
                    </div>
                </div>

                {/* Content Section */}
                <div className="space-y-10 bg-white/5 p-8 md:p-12 rounded-[2.5rem] border border-white/10 backdrop-blur-xl mb-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                            {project.title}
                        </h1>
                        <p className="text-xl text-green-500 font-medium italic">
                            "{project.description}"
                        </p>
                    </div>

                    <div className="w-full h-px bg-white/10"></div>

                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-green-500 rounded-full"></span>
                            The Full Idea
                        </h3>
                        <div className="text-white/70 leading-relaxed text-lg whitespace-pre-wrap">
                            {project.content || "No detailed information provided for this project."}
                        </div>
                    </div>

                    {/* Interaction Bar */}
                    <div className="flex flex-wrap items-center gap-4 pt-6">
                        <button
                            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${likesCount > 0 ? 'bg-red-500/20 text-red-500' : 'bg-white/5 text-white/60 hover:bg-white/10'
                                }`}
                            onClick={handleLike}
                            disabled={isLiking}
                        >
                            <i className={likesCount > 0 ? 'bi bi-heart-fill' : 'bi bi-heart'}></i>
                            <span className="font-bold">{likesCount}</span>
                        </button>
                        <button
                            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${dislikesCount > 0 ? 'bg-blue-500/20 text-blue-500' : 'bg-white/5 text-white/60 hover:bg-white/10'
                                }`}
                            onClick={handleDislike}
                            disabled={isDisliking}
                        >
                            <i className={dislikesCount > 0 ? 'bi bi-hand-thumbs-down-fill' : 'bi bi-hand-thumbs-down'}></i>
                            <span className="font-bold">{dislikesCount}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;