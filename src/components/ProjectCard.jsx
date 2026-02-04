import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { likePost, dislikePost } from '../services/postService';
import {
    Heart,
    MessageSquare,
    Share2,
    ThumbsDown
} from 'lucide-react';

const ProjectCard = ({ id, title, description, userid, userProfilePic, details, likesCount = 0, dislikesCount = 0, onUpdate }) => {
    const navigate = useNavigate();
    const [localLikesCount, setLocalLikesCount] = useState(likesCount);
    const [localDislikesCount, setLocalDislikesCount] = useState(dislikesCount);
    const [isLiking, setIsLiking] = useState(false);
    const [isDisliking, setIsDisliking] = useState(false);

    const handleLike = async (e) => {
        e.stopPropagation();
        if (isLiking || !id) return;

        try {
            setIsLiking(true);
            await likePost(id);
            // Optimistically update the UI
            setLocalLikesCount(prev => prev > 0 ? prev - 1 : prev + 1);
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error('Failed to like post:', error);
            // You could show a toast notification here
        } finally {
            setIsLiking(false);
        }
    };

    const handleDislike = async (e) => {
        e.stopPropagation();
        if (isDisliking || !id) return;

        try {
            setIsDisliking(true);
            await dislikePost(id);
            // Optimistically update the UI
            setLocalDislikesCount(prev => prev > 0 ? prev - 1 : prev + 1);
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error('Failed to dislike post:', error);
            // You could show a toast notification here
        } finally {
            setIsDisliking(false);
        }
    };

    const handleNavigate = () => {
        navigate(`/project-details/${id}`);
    };

    // Fallback avatar if no profile pic
    const defaultAvatar = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(userid || 'User') + '&background=10b981&color=fff&size=128';

    return (
        <div
            onClick={handleNavigate}
            className="flex flex-col p-6 transition-all duration-300 shadow-xl gap-4 group w-full cursor-pointer bg-transparent dark:bg-transparent light:bg-white hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-gray-50 border border-white/10 dark:border-white/10 light:border-gray-200 hover:border-green-500/30 rounded-3xl hover:shadow-2xl hover:shadow-green-500/10 hover:scale-[1.01]"
            role="article"
            aria-label={`Post by ${userid}: ${title}`}
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleNavigate();
                }
            }}
        >
            <div className="flex items-center gap-3">
                <img
                    className='rounded-full w-8 h-8 object-cover border border-white/10 dark:border-white/10 light:border-gray-300 group-hover:border-green-500/50 transition-colors'
                    src={userProfilePic || defaultAvatar}
                    alt={`${userid}'s profile`}
                    onError={(e) => { e.target.src = defaultAvatar; }}
                />
                <span className='flex items-center gap-2'><p className="font-medium text-white/90 dark:text-white/90 light:text-gray-900 group-hover:text-white dark:group-hover:text-white light:group-hover:text-gray-900 transition-colors">{userid}</p> <p className='text-xs text-white/40 dark:text-white/40 light:text-gray-500'>/ 2 days ago</p> </span>
            </div>
            <div className="space-y-1">
                <h2 className='text-lg text-white font-bold leading-tight group-hover:text-green-500 transition-colors'>{title}</h2>
                <p className='text-sm text-white/50 leading-relaxed line-clamp-2 group-hover:text-white/70 transition-colors'>{description}</p>
            </div>
            <div className="flex items-center gap-3">
                <button
                    className="flex items-center gap-2 p-2 px-4 text-sm rounded-full bg-white/5 hover:bg-red-500/20 hover:border-red-500/30 border border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleLike}
                    disabled={isLiking}
                    aria-label={`Like post. Current likes: ${localLikesCount}`}
                >
                    <i className={`bi ${localLikesCount > 0 ? 'bi-heart-fill text-red-500' : 'bi-heart hover:text-red-500'} transition-transform hover:scale-110`}></i>
                    <span className="text-white/60 font-medium">{localLikesCount}</span>
                </button>
                <button
                    className="flex items-center gap-2 p-2 px-4 text-sm rounded-full bg-white/5 hover:bg-blue-500/20 hover:border-blue-500/30 border border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleDislike}
                    disabled={isDisliking}
                    aria-label={`Dislike post. Current dislikes: ${localDislikesCount}`}
                >
                    <i className={`bi ${localDislikesCount > 0 ? 'bi-hand-thumbs-down-fill text-blue-500' : 'bi-hand-thumbs-down'} transition-transform hover:scale-110`}></i>
                    <span className="text-white/60 font-medium">{localDislikesCount}</span>
                </button>
            </div>
            <div className='w-full h-px bg-white/10 group-hover:bg-green-500/20 transition-colors'></div>
        </div>
    );
};

export default ProjectCard;
