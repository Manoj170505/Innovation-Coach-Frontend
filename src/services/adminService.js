import api from '../config/apiConfig';

// Get system statistics
export const getSystemStats = async () => {
    const response = await api.get('/users/admin/stats');
    return response.data;
};

// Get all users
export const getAllUsers = async () => {
    const response = await api.get('/users/admin/all-users');
    return response.data;
};

// Get pending users (waiting for approval)
export const getPendingUsers = async () => {
    const response = await api.get('/users/admin/pending-users');
    return response.data;
};

// Approve a user with role selection
export const approveUser = async (userId, role = 'USER') => {
    const response = await api.patch(`/users/admin/approve/${userId}`, { role });
    return response.data;
};

// Reject a user
export const rejectUser = async (userId) => {
    const response = await api.patch(`/users/admin/reject/${userId}`);
    return response.data;
};

// Delete a user
export const deleteUser = async (userId) => {
    const response = await api.delete(`/users/admin/delete/${userId}`);
    return response.data;
};

// Update post state (Approve/Reject)
export const updatePostState = async (postId, state) => {
    const response = await api.patch(`/posts/admin/update-state/${postId}`, { state });
    return response.data;
};

// Get all posts for admin (including pending, approved, rejected)
export const getAllPostsForAdmin = async () => {
    const response = await api.get('/posts/admin/all-posts');
    return response.data;
};
