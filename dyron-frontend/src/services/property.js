import api from './api';

export const propertyService = {
  async getAllProperties(filters = {}) {
    try {
      const response = await api.get('/properties', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching properties:', error);
      throw error.response?.data || { error: 'Failed to fetch properties' };
    }
  },

  async getPropertyById(id) {
    try {
      const response = await api.get(`/properties/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching property:', error);
      throw error.response?.data || { error: 'Failed to fetch property' };
    }
  },

  async createProperty(propertyData) {
    try {
      // Convert images to URLs if they're File objects
      const formData = new FormData();
      
      // Handle images separately
      if (propertyData.images) {
        propertyData.images.forEach(image => {
          formData.append('images', image);
        });
        delete propertyData.images;
      }

      // Add other property data
      Object.keys(propertyData).forEach(key => {
        formData.append(key, propertyData[key]);
      });

      const response = await api.post('/properties', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating property:', error);
      throw error.response?.data || { error: 'Failed to create property' };
    }
  },

  async updateProperty(id, propertyData) {
    try {
      const response = await api.put(`/properties/${id}`, propertyData);
      return response.data;
    } catch (error) {
      console.error('Error updating property:', error);
      throw error.response?.data || { error: 'Failed to update property' };
    }
  },

  async deleteProperty(id) {
    try {
      const response = await api.delete(`/properties/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting property:', error);
      throw error.response?.data || { error: 'Failed to delete property' };
    }
  }
}; 