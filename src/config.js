// src/config.js
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://crop-disease-detection-1-zqw1.onrender.com';

// In your upload component or service
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${API_BASE_URL}/api/predict`, {
      method: 'POST',
      body: formData
    });
    return await response.json();
  } catch (error) {
    console.error('Upload failed:', error);
  }
};