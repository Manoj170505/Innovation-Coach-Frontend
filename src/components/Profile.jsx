import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyProfile } from '../services/userService'
import { getUserPosts } from '../services/postService'

const Profile = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        description: '',
        image: '',
        stats: {
            totalProjects: 0,
            approved: 0,
            waitlist: 0,
            rejected: 0
        }
    });

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            setLoading(true);

            // Fetch user profile
            const userResponse = await getMyProfile();
            if (userResponse.status === 'success') {
                const userData = userResponse.data;

                // Fetch user's posts to calculate stats
                const postsResponse = await getUserPosts();
                let stats = {
                    totalProjects: 0,
                    approved: 0,
                    waitlist: 0,
                    rejected: 0
                };

                if (postsResponse.status === 'success') {
                    const posts = postsResponse.data;
                    stats.totalProjects = posts.length;
                    stats.approved = posts.filter(p => p.state === 'Approved').length;
                    stats.waitlist = posts.filter(p => p.state === 'Pending').length;
                    stats.rejected = posts.filter(p => p.state === 'Rejected').length;
                }

                setProfile({
                    name: userData.name || 'User',
                    email: userData.email || '',
                    description: userData.description || 'No description added yet.',
                    image: userData.profilePic || 'https://images.unsplash.com/photo-1765530813405-d23f98fda0b4?q=80&w=687&auto=format&fit=crop',
                    stats
                });
            }
        } catch (err) {
            console.error('Error fetching profile:', err);
            setError(err.response?.data?.message || 'Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-400 mb-4">{error}</p>
                    <button
                        onClick={fetchUserData}
                        className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-full transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-black text-white selection:bg-green-500/30 p-4 md:p-8 pt-24'>
            <div className="flex flex-col gap-12 animate-fade-in">
                <div className='flex items-center justify-between'>
                    <h1 className='text-2xl font-bold'>Hello {profile.name.split(' ')[0]},</h1>
                    <button
                        className='bg-green-500 hover:bg-green-600 text-black px-6 py-2.5 rounded-full transition-all hover:scale-105 active:scale-95 font-bold shadow-lg shadow-green-500/20'
                        onClick={() => navigate('/edit-profile')}
                    >
                        Edit Profile
                    </button>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <img
                            className='w-24 h-24 rounded-full border-2 border-green-500/20 hover:border-green-500 transition-all object-cover shadow-xl'
                            src={profile.image}
                            alt={profile.name}
                        />
                        <div className="">
                            <h1 className='text-2xl font-bold'>{profile.name}</h1>
                            <p className='text-gray-400'>{profile.email}</p>
                        </div>
                    </div>
                    <p className="text-gray-300">{profile.description}</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center justify-center h-24 bg-white/20 rounded-xl p-4 hover:bg-white/25 transition-all hover:scale-105 cursor-default">
                        <h1 className='text-xs text-gray-400'>TOTAL PROJECTS</h1>
                        <p className='text-4xl font-bold'>{profile.stats.totalProjects}</p>
                    </div>
                    <div className="flex flex-col items-center justify-center h-24 bg-green-500/20 rounded-xl p-4 hover:bg-green-500/25 transition-all hover:scale-105 cursor-default border border-green-500/30">
                        <h1 className='text-xs text-gray-400'>APPROVED</h1>
                        <p className='text-4xl font-bold text-green-400'>{profile.stats.approved}</p>
                    </div>
                    <div className="flex flex-col items-center justify-center h-24 bg-orange-500/20 rounded-xl p-4 hover:bg-orange-500/25 transition-all hover:scale-105 cursor-default border border-orange-500/30">
                        <h1 className='text-xs text-gray-400'>IN WAITLIST</h1>
                        <p className='text-4xl font-bold text-orange-400'>{profile.stats.waitlist}</p>
                    </div>
                    <div className="flex flex-col items-center justify-center h-24 bg-red-500/20 rounded-xl p-4 hover:bg-red-500/25 transition-all hover:scale-105 cursor-default border border-red-500/30">
                        <h1 className='text-xs text-gray-400'>REJECTED</h1>
                        <p className='text-4xl font-bold text-red-400'>{profile.stats.rejected}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
