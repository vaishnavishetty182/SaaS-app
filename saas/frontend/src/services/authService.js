import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Replace with your actual API URL

// Register user
const register = async (userData) => {
  try {
    // Ensure the field is 'name' and not 'username' as per backend requirements
    const response = await axios.post(`${API_URL}/api/auth/register`, {
      name: userData.username,  // Map 'username' to 'name'
      email: userData.email,
      password: userData.password,
      role: userData.role || 'user',  // Dynamically handle 'role', default to 'user'
      orgName: userData.orgName || 'Example Organization',  // Add organization name if needed for admin role
    });
    return response.data;
  } catch (error) {
    // Log the error for debugging
    console.error('Registration error:', error.response ? error.response.data : error.message);
    // Throw the error to be handled by the caller
    throw error;
  }
};

// Login user
const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
    return response.data;
  } catch (error) {
    // Log the error for debugging
    console.error('Login error:', error.response ? error.response.data : error.message);
    // Throw the error to be handled by the caller
    throw error;
  }
};

export default { register, login };
