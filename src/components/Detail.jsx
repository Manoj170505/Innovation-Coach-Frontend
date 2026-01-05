import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Heart, ThumbsDown, MessageSquare } from 'lucide-react';

const Detail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const project = location.state;

    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);

    if (!project) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold">Project not found</h2>
                    <button onClick={() => navigate(-1)} className="text-green-500 hover:text-green-400 font-medium">Go back</button>
                </div>
            </div>
        );
    }

    const handleLike = () => {
        setLike(!like);
        if (dislike) setDislike(false);
    };

    const handleDislike = () => {
        setDislike(!dislike);
        if (like) setLike(false);
    };

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
                    <img className='bg-white/20 rounded-full w-12 h-12 p-1' src="./assets/user.png" alt="user-profile" />
                    <div>
                        <p className="font-bold text-lg">{project.userid || project.id || "Anonymous"}</p>
                        <p className="text-sm text-white/40">Posted 2 days ago</p>
                    </div>
                    {project.visibility && (
                        <span className="ml-auto px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-bold border border-green-500/20 uppercase tracking-wider">
                            {project.visibility}
                        </span>
                    )}
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
                            {project.details || "No detailed information provided for this project."}
                        </div>
                    </div>

                    {/* Interaction Bar */}
                    <div className="flex flex-wrap items-center gap-4 pt-6">
                        <button
                            className={`flex items-center gap-2 ${like ? 'bi bi-heart-fill text-red-500' : 'bi bi-heart text-white/60'}`}
                            onClick={handleLike}
                        >
                            <span className="font-bold">{like ? '1' : '0'}</span>
                        </button>
                        <button
                            className={`flex items-center gap-2 ${dislike ? 'bi bi-hand-thumbs-down-fill text-blue-500' : 'bi bi-hand-thumbs-down text-white/60'}`}
                            onClick={handleDislike}
                        >
                            <span className="font-bold">{dislike ? '1' : '0'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;