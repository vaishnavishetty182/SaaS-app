import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Base API URL

// User-related API calls
export const userService = {
  // Fetch all users (with auth)
  fetchUsers: async () => {
    try {
      const response = await axios.get(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching users', error);
      return [];
    }
  },

  // Get all users (without auth - if needed)
  getUsers: async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Get user by ID
  getUserById: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw error;
    }
  },

  // Update user
  updateUser: async (userId, userData) => {
    try {
      const response = await axios.put(`${API_URL}/users/${userId}`, userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // Delete user
  deleteUser: async (userId) => {
    try {
      const response = await axios.delete(`${API_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting user', error);
      throw error;
    }
  },

  // Activate/Deactivate plan
  updatePlanStatus: async (userId, status) => {
    try {
      const response = await axios.put(
        `${API_URL}/users/${userId}/plan-status`, 
        { active: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating plan status:', error);
      throw error;
    }
  },
};

// Plan-related API calls
export const planService = {
  // Fetch all plans
  fetchPlans: async () => {
    try {
      const response = await axios.get(`${API_URL}/plans`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching plans', error);
      return [];
    }
  },
};