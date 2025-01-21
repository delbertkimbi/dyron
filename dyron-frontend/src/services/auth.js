import api from './api';
import { toast } from 'react-hot-toast';

export const authService = {
  async login(email, password) {
    try {
      console.log('Attempting login...', { email });
      const response = await api.post('/users/login', { email, password });
      console.log('Login response:', response.data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error.response?.data || { error: 'Failed to login' };
    }
  },

  async register(userData) {
    try {
      console.log('Registering user:', userData);
      const response = await api.post('/users/register', userData);
      console.log('Registration response:', response.data);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      throw error.response?.data || { message: 'Registration failed' };
    }
  },

  async validateToken() {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error) {
      console.error('Token validation error:', error);
      throw error.response?.data || { error: 'Invalid token' };
    }
  },

  logout() {
    localStorage.removeItem('token');
  },

  async forgotPassword(email) {
    const response = await api.post('/users/forgot-password', { email });
    return response.data;
  }
}; 