import api from '../config/apiConfig';

// Get current user profile
export const getMyProfile = async () => {
    const response = await api.get('/users/me');
    return response.data;
};

// Get user by ID
export const getUserById = async (userId) => {
    const response = await api.get(`/users/profile/${userId}`);
    return response.data;
};

// Update user profile
export const updateProfile = async (updateData) => {
    const response = await api.patch('/users/update-me', updateData);
    return response.data;
};

// Update profile with image
export const updateProfileWithImage = async (formData) => {
    const response = await api.patch('/users/update-me', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};
