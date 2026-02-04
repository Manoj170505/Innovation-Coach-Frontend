import api from '../config/apiConfig';

// Create a new post
export const createPost = async (postData) => {
    const response = await api.post('/posts/create', postData);
    return response.data;
};

// Get all approved posts
export const getAllPosts = async () => {
    const response = await api.get('/posts/all');
    return response.data;
};

// Get popular posts
export const getPopularPosts = async () => {
    const response = await api.get('/posts/popular');
    return response.data;
};

// Get user's own posts
export const getUserPosts = async () => {
    const response = await api.get('/posts/my-posts');
    return response.data;
};

// Get single post by ID
export const getPostById = async (postId) => {
    const response = await api.get(`/posts/${postId}`);
    return response.data;
};

// Like a post
export const likePost = async (postId) => {
    const response = await api.patch(`/posts/like/${postId}`);
    return response.data;
};

// Dislike a post
export const dislikePost = async (postId) => {
    const response = await api.patch(`/posts/dislike/${postId}`);
    return response.data;
};

// Delete a post
export const deletePost = async (postId) => {
    const response = await api.delete(`/posts/${postId}`);
    return response.data;
};
