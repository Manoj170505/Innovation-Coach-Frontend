import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Heart,
    MessageSquare,
    Share2,
    ThumbsDown
} from 'lucide-react';

const ProjectCard = ({ title, description, userid, details }) => {
    const navigate = useNavigate();
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);

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
        navigate('/project-details', { state: { title, description, userid, details } });
    };

    return (
        <div
            onClick={handleNavigate}
            className="flex flex-col p-6 transition-all duration-300 shadow-xl gap-4 group w-full cursor-pointer hover:bg-white/10 border border-transparent hover:border-white/10 rounded-3xl"
        >
            <div className="flex items-center gap-3">
                <img className='bg-white/50 rounded-full w-8 h-8' src="./assets/user.png" alt="user-profile" />
                <span className='flex items-center gap-2'><p className="font-medium text-white/90">{userid}</p> <p className='text-xs text-white/40'>/ 2 days ago</p> </span>
            </div>
            <div className="space-y-1">
                <h2 className='text-lg text-white font-bold leading-tight group-hover:text-green-500 transition-colors'>{title}</h2>
                <p className='text-sm text-white/50 leading-relaxed line-clamp-2'>{description}</p>
            </div>
            <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 p-2 px-4 text-sm rounded-full bg-white/5 hover:bg-white/10 transition-colors" onClick={handleLike}>
                    {like ? <i className="bi bi-heart-fill text-red-500"></i> : <i className="bi bi-heart hover:text-red-500"></i>}
                    <span className="text-white/60">{like ? '1' : '0'}</span>
                </button>
                <button className="flex items-center gap-2 p-2 px-4 text-sm rounded-full bg-white/5 hover:bg-white/10 transition-colors" onClick={handleDislike}>
                    {dislike ? <i className="bi bi-hand-thumbs-down-fill text-blue-500"></i> : <i className="bi bi-hand-thumbs-down"></i>}
                    <span className="text-white/60">{dislike ? '1' : '0'}</span>
                </button>
            </div>
            <div className='w-full h-px bg-white/10'></div>
        </div>
    );
};

export default ProjectCard;
