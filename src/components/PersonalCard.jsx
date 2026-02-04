import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ThumbsUp,
    ThumbsDown,
    Trash2
} from 'lucide-react';
import { deletePost } from '../services/postService';

const PersonalCard = ({ title, description, id, details, visibility, onDelete }) => {
    const navigate = useNavigate();
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState('');

    const handleLike = (e) => {
        e.stopPropagation();
        setLike(!like);
        if (dislike) setDislike(false);
    };

    const handleDislike = (e) => {
        e.stopPropagation();
        setDislike(!dislike);
        if (like) setLike(false);
    };

    const handleNavigate = () => {
        navigate(`/project-details/${id}`);
    };

    const handleDelete = async (e) => {
        e.stopPropagation();

        // Show confirmation dialog
        const confirmed = window.confirm(
            `Are you sure you want to delete "${title}"?\n\nThis action cannot be undone.`
        );

        if (!confirmed) return;

        try {
            setIsDeleting(true);
            setError('');
            await deletePost(id);

            // Call onDelete callback to refresh the list
            if (onDelete) {
                onDelete();
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete post');
            console.error('Delete error:', err);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div
            onClick={handleNavigate}
            className="flex flex-col p-6 transition-all duration-300 shadow-xl gap-4 group w-full cursor-pointer hover:bg-white/10 border border-transparent hover:border-white/10 rounded-3xl relative"
        >
            {/* Delete Button */}
            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="absolute top-4 right-4 p-2 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Delete post"
            >
                <Trash2 className={`w-4 h-4 text-red-400 ${isDeleting ? 'animate-pulse' : ''}`} />
            </button>

            <div className="flex items-center gap-3">
                <img className='bg-white/50 rounded-full w-8 h-8' src="./assets/user.png" alt="user-profile" />
                <span className='flex items-center gap-2'><p className="font-medium text-white/90">{id}</p> <p className='text-xs text-white/40'>/ 2 days ago</p> </span>
            </div>
            <div className="space-y-1">
                <h2 className='text-lg text-white font-bold leading-tight group-hover:text-green-500 transition-colors'>{title}</h2>
                <p className='text-sm text-white/50 leading-relaxed line-clamp-2'>{description}</p>
            </div>

            {error && (
                <div className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-red-400 text-xs">{error}</p>
                </div>
            )}

            <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 p-2 px-4 text-sm rounded-full bg-white/5 hover:bg-white/10 transition-colors" onClick={handleLike}>
                    {like ? <i className="bi bi-heart-fill text-red-500"></i> : <i className="bi bi-heart hover:text-red-500"></i>}
                    <span className="text-white/60">{like ? '1' : '0'}</span>
                </button>
                <button className="flex items-center gap-2 p-2 px-4 text-sm rounded-full bg-white/5 hover:bg-white/10 transition-colors" onClick={handleDislike}>
                    {dislike ? <i className="bi bi-hand-thumbs-down-fill text-blue-500"></i> : <i className="bi bi-hand-thumbs-down"></i>}
                    <span className="text-white/60">{dislike ? '1' : '0'}</span>
                </button>
                <p className='text-xs text-white bg-green-500 px-2 py-1 rounded-full'>
                    Approved
                </p>
            </div>
            <div className='w-full h-px bg-white/10'></div>
        </div>
    );
};

export default PersonalCard;
