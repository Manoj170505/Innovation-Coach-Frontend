import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: 'MJ',
        email: 'mj@example.com',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis recusandae quisquam laborum aspernatur tempore animi expedita soluta? Voluptatibus neque temporibus laudantium velit, inventore hic magnam fugiat, minima nihil saepe corporis?',
        image: 'https://images.unsplash.com/photo-1765530813405-d23f98fda0b4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
        }
    }, []);

    return (
        <div className='min-h-screen bg-black text-white selection:bg-green-500/30 p-4 md:p-8 pt-24'>
            <div className="flex flex-col gap-12">
                <div className='flex items-center justify-between'>
                    <h1 className='text-2xl font-bold'>Hello {profile.name.split(' ')[0]},</h1>
                    <button className='bg-green-500/80 hover:bg-green-500/30 text-white px-4 py-2 rounded-full transition-colors' onClick={() => navigate('/edit-profile')}>Edit Profile</button>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <img className='w-24 h-24 rounded-full border border-white/10 hover:border-white/20 transition-colors object-cover' src={profile.image} alt={profile.name} />
                        <div className="">
                            <h1 className='text-2xl font-bold'>{profile.name}</h1>
                            <p className='text-gray-400'>{profile.email}</p>
                        </div>
                    </div>
                    <p>{profile.description}</p>
                    <i className='bi bi-star-fill text-yellow-300'><span className='text-white ml-2'>{profile.rating}</span></i>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center justify-center h-24 bg-white/20 rounded-xl p-4">
                        <h1 className='text-xs text-gray-400'>TOTAL PROJECTS</h1>
                        <p className='text-4xl font-bold'>{profile.stats.totalProjects}</p>
                    </div>
                    <div className="flex flex-col items-center justify-center h-24 bg-white/20 rounded-xl p-4">
                        <h1 className='text-xs text-gray-400'>APPROVED</h1>
                        <p className='text-4xl font-bold'>{profile.stats.approved}</p>
                    </div>
                    <div className="flex flex-col items-center justify-center h-24 bg-white/20 rounded-xl p-4">
                        <h1 className='text-xs text-gray-400'>IN WAITLIST</h1>
                        <p className='text-4xl font-bold'>{profile.stats.waitlist}</p>
                    </div>
                    <div className="flex flex-col items-center justify-center h-24 bg-white/20 rounded-xl p-4">
                        <h1 className='text-xs text-gray-400'>REJECTED</h1>
                        <p className='text-4xl font-bold'>{profile.stats.rejected}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
