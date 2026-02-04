import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { createPost } from '../services/postService';

const Post = () => {
    const navigate = useNavigate();
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const getWordCount = (text) => {
        return text.trim().split(/\s+/).filter(word => word !== "").length;
    };

    const handleDescriptionChange = (e) => {
        const text = e.target.value;
        const words = text.trim().split(/\s+/).filter(word => word !== "");

        if (words.length <= 20 || text.endsWith(" ") || text.length < description.length) {
            setDescription(text);
        }
    };

    const handleTitleChange = (e) => {
        const text = e.target.value;
        const words = text.trim().split(/\s+/).filter(word => word !== "");

        if (words.length <= 3 || text.endsWith(" ") || text.length < title.length) {
            setTitle(text);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !description.trim() || !content.trim()) {
            setError('Please fill in all fields');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            await createPost({
                title: title.trim(),
                description: description.trim(),
                content: content.trim(),
                visibility: isPrivate ? 'private' : 'public'
            });

            // Navigate to projects page after successful creation
            navigate('/projects');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create post');
        } finally {
            setIsLoading(false);
        }
    };

    const wordCount = getWordCount(description);
    const titleCount = getWordCount(title);

    return (
        <div className="min-h-screen bg-black text-white selection:bg-green-500/30 p-4 md:p-8 pt-24">
            <div className="max-w-3xl mx-auto">
                <div className="mb-10 space-y-2">
                    <h1 className="text-4xl font-extrabold tracking-tight">
                        Share Your <span className="text-green-500">Innovation</span>
                    </h1>
                    <p className="text-white/60 text-lg">Bring your ideas to life and share them with the world.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                        <p className="text-red-400 text-center">{error}</p>
                    </div>
                )}

                <form className="space-y-8 bg-white/5 p-6 md:p-10 rounded-3xl border border-white/10 backdrop-blur-xl" onSubmit={handleSubmit}>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-xl font-bold block">Title</label>
                            <span className={`text-sm ${titleCount > 3 ? (titleCount >= 3 ? 'text-red-500' : 'text-yellow-500') : 'text-white/40'}`}>
                                {titleCount}/3 words
                            </span>
                        </div>
                        <input
                            type="text"
                            placeholder="What's the name of your masterpiece?"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all"
                            value={title}
                            onChange={handleTitleChange}
                            required
                        />
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-xl font-bold block">Description</label>
                            <span className={`text-sm ${wordCount > 15 ? (wordCount >= 20 ? 'text-red-500' : 'text-yellow-500') : 'text-white/40'}`}>
                                {wordCount}/20 words
                            </span>
                        </div>
                        <textarea
                            rows="3"
                            value={description}
                            onChange={handleDescriptionChange}
                            placeholder="A short summary of your project (max 20 words)..."
                            className={`w-full bg-white/5 border ${wordCount >= 20 ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-4 px-6 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 ${wordCount >= 20 ? 'focus:ring-red-500/50' : 'focus:ring-green-500/50'} transition-all resize-none`}
                            required
                        ></textarea>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xl font-bold block ml-1">Detailed Content</label>
                        <textarea
                            rows="8"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Explain the magic behind your idea..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all"
                            required
                        ></textarea>
                    </div>

                    <div className="flex items-center space-x-3 p-4 rounded-2xl w-fit">
                        <div className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                id="private"
                                className="sr-only peer"
                                checked={isPrivate}
                                onChange={(e) => setIsPrivate(e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                        </div>
                        <label htmlFor="private" className="text-lg font-medium cursor-pointer select-none">Make Private</label>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full md:w-auto px-12 py-4 bg-green-500 hover:bg-green-600 text-black font-bold text-lg rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Publishing...' : 'Publish Project'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Post