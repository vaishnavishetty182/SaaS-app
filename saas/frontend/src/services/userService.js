import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Replace with your actual API URL

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/register`, {
      name: userData.name,  // Ensure this matches the backend field name
      email: userData.email,
      password: userData.password,
      role: userData.role || 'user',
      orgName: userData.orgName || 'Example Organization',
    });

    console.log('Registration success:', response.data);
    return response.data;
  } catch (error) {
    handleError(error, 'Registration failed');
  }
};

// Login User
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
    return response.data; // Ensure this returns { token, user }
  } catch (error) {
    handleError(error, 'Login failed');
  }
};

// Helper function to handle errors
const handleError = (error, defaultMessage) => {
  if (error.response) {
    console.error(`${defaultMessage}:`, error.response.data.message);
    throw new Error(error.response.data.message);
  } else if (error.request) {
    console.error('No response received from server');
    throw new Error('No response from server');
  } else {
    console.error('Error:', error.message);
    throw new Error(error.message);
  }
};

export default {
  registerUser,
  loginUser,
};
