import axios from 'axios';

// Centralized API configuration
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://crop-disease-detection-1-zqw1.onrender.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post('/api/predict', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Upload failed:', error.response ? error.response.data : error.message);
    throw new Error('Failed to analyze the image. Please try again or check if the server is running.');
  }
};
