import React, { useState, useEffect } from 'react'
import PersonalCard from './PersonalCard'
import { getUserPosts } from '../services/postService'

const Projects = () => {

    const [visibility, setVisibility] = useState("public");
    const [search, setSearch] = useState("");
    const [personal, setPersonal] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUserPosts();
    }, []);

    const fetchUserPosts = async () => {
        try {
            setLoading(true);
            const response = await getUserPosts();
            if (response.status === 'success') {
                setPersonal(response.data);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load your posts');
        } finally {
            setLoading(false);
        }
    };

    const handleVisibility = (visibility) => {
        setVisibility(visibility);
    }

    const filteredPersonal = personal.filter((post) => post.visibility === visibility);
    const filteredSearch = filteredPersonal.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()));

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-green-500/30">

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
                <div className="flex flex-col space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                            Your <span className="text-green-500">Ideas</span>
                        </h1>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                            <div className="flex justify-center items-center bg-white/20 rounded-full w-fit">
                                <p onClick={() => handleVisibility("public")} className={visibility === "public" ? "bg-white text-green-500 py-3 px-6 rounded-full cursor-pointer transition-all" : "py-3 px-6 cursor-pointer"}>Public</p>
                                <p onClick={() => handleVisibility("private")} className={visibility === "private" ? "bg-white text-green-500 py-3 px-6 rounded-full cursor-pointer transition-all" : "py-3 px-6 cursor-pointer"}>Private</p>
                            </div>
                            <div className="flex bg-white/20 rounded-full w-full md:w-fit">
                                <input type="text" placeholder="Search" className="bg-transparent text-white focus:outline-none rounded-full py-3 px-6 w-full" onChange={(event) => setSearch(event.target.value)} />
                                <button onClick={() => setSearch(event.target.value)} className="bg-green-500 text-white py-3 px-6 rounded-full hover:bg-green-600 transition-colors"><i className="bi bi-search"></i></button>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                            <p className="text-red-400 text-center">{error}</p>
                        </div>
                    )}

                    <div className="flex flex-col space-y-6 mx-auto w-full">
                        {filteredSearch.length === 0 ? (
                            <p className="text-gray-400 text-center py-12">
                                {personal.length === 0
                                    ? "You haven't created any posts yet. Share your first idea!"
                                    : `No ${visibility} posts found.`}
                            </p>
                        ) : (
                            filteredSearch.map((post) => (
                                <PersonalCard
                                    key={post.id}
                                    id={post.id}
                                    title={post.title}
                                    description={post.description}
                                    details={post.content}
                                    visibility={post.visibility}
                                    state={post.state}
                                    onDelete={fetchUserPosts}
                                />
                            ))
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Projects