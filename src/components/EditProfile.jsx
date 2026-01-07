import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const EditProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        description: '',
        image: '',
        rating: 4.5,
        stats: {
            totalProjects: 10,
            approved: 10,
            waitlist: 10,
            rejected: 10
        }
    });

    useEffect(() => {
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
            setProfile(JSON.parse(savedProfile));
        } else {
            // Default values if no profile saved
            setProfile({
                name: 'MJ',
                email: 'mj@example.com',
                description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
                image: 'https://images.unsplash.com/photo-1765530813405-d23f98fda0b4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                rating: 4.5,
                stats: {
                    totalProjects: 10,
                    approved: 10,
                    waitlist: 10,
                    rejected: 10
                }
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile(prev => ({
                    ...prev,
                    image: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('userProfile', JSON.stringify(profile));
        navigate('/profile');
    };

    return (
        <div className='min-h-screen bg-black text-white selection:bg-green-500/30 p-4 md:p-8 pt-24'>
            <div className='max-w-2xl mx-auto'>
                <div className='flex items-center justify-between mb-8'>
                    <h1 className='text-3xl font-bold'>Edit Profile</h1>
                    <div className='flex gap-4'>
                        <button
                            onClick={() => navigate('/profile')}
                            className='px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors'
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className='bg-green-500 hover:bg-green-600 text-black font-bold px-6 py-2 rounded-full transition-colors'
                        >
                            Save Changes
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className='flex flex-col items-center gap-4 mb-8'>
                        <div className='relative group'>
                            <img
                                src={profile.image || 'https://via.placeholder.com/150'}
                                alt="Profile Preview"
                                className='w-32 h-32 rounded-full object-cover border-2 border-green-500/20 group-hover:border-green-500 transition-colors'
                            />
                            <label className='absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity'>
                                <i className='bi bi-camera-fill text-2xl'></i>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className='hidden'
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                        <p className='text-sm text-gray-400'>Click to change profile picture</p>
                    </div>

                    <div className='space-y-2'>
                        <label className='text-sm font-medium text-gray-400'>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                            className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-green-500 outline-none transition-colors'
                            placeholder="Your Name"
                        />
                    </div>

                    <div className='space-y-2'>
                        <label className='text-sm font-medium text-gray-400'>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleChange}
                            className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-green-500 outline-none transition-colors'
                            placeholder="your@email.com"
                        />
                    </div>

                    <div className='space-y-2'>
                        <label className='text-sm font-medium text-gray-400'>About / Description</label>
                        <textarea
                            name="description"
                            value={profile.description}
                            onChange={handleChange}
                            rows="4"
                            className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-green-500 outline-none transition-colors resize-none'
                            placeholder="Tell us about yourself..."
                        ></textarea>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfile