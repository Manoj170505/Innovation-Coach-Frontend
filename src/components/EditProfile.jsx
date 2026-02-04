import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyProfile, updateProfileWithImage, updateProfile } from '../services/userService'

const EditProfile = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [profile, setProfile] = useState({
        name: '',
        description: '',
        profilePic: ''
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const response = await getMyProfile();
            if (response.status === 'success') {
                const userData = response.data;
                setProfile({
                    name: userData.name || '',
                    description: userData.description || '',
                    profilePic: userData.profilePic || ''
                });
                setImagePreview(userData.profilePic || '');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

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
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setError('Please select a valid image file');
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('Image size should be less than 5MB');
                return;
            }

            setImageFile(file);

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            if (imageFile) {
                // If there's a new image, use FormData
                const formData = new FormData();
                formData.append('name', profile.name);
                formData.append('description', profile.description);
                formData.append('profilePic', imageFile);

                await updateProfileWithImage(formData);
            } else {
                // If no image, just update text fields
                await updateProfile({
                    name: profile.name,
                    description: profile.description
                });
            }

            navigate('/profile');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-black text-white selection:bg-green-500/30 p-4 md:p-8 pt-24'>
            <div className='max-w-2xl mx-auto'>
                <div className='flex items-center justify-between mb-8'>
                    <h1 className='text-3xl font-bold'>Edit Profile</h1>
                    <div className='flex gap-4'>
                        <button
                            onClick={() => navigate('/profile')}
                            className='px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors'
                            disabled={saving}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={saving}
                            className='bg-green-500 hover:bg-green-600 text-black font-bold px-6 py-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                        <p className="text-red-400 text-center">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className='flex flex-col items-center gap-4 mb-8'>
                        <div className='relative group'>
                            <img
                                src={imagePreview || 'https://via.placeholder.com/150'}
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
                                    disabled={saving}
                                />
                            </label>
                        </div>
                        <p className='text-sm text-gray-400'>
                            {imageFile ? `Selected: ${imageFile.name}` : 'Click to change profile picture'}
                        </p>
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
                            required
                            disabled={saving}
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
                            disabled={saving}
                        ></textarea>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfile