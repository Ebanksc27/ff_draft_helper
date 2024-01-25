import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; 

// Get all drafts (Future implement)
const getDrafts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/drafts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching drafts:', error);
    throw error;
  }
};

// Create a new draft (future implement)
const createDraft = async (draftData) => {
  try {
    const response = await axios.post(`${BASE_URL}/drafts/create`, draftData);
    return response.data;
  } catch (error) {
    console.error('Error creating draft:', error);
    throw error;
  }
};

// Get draft details by ID (future implement)
const getDraftDetails = async (draftId) => {
  try {
    const response = await axios.get(`${BASE_URL}/drafts/${draftId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching draft details:', error);
    throw error;
  }
};

// Fetch draftboard data
const getDraftboard = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${BASE_URL}/api/draftboards/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching draftboard:', error);
      throw error;
    }
  };  
  
  // Update draftboard data
  const updateDraftboard = async (userId, draftboardData) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`${BASE_URL}/api/draftboards/${userId}`, draftboardData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating draftboard:', error);
      throw error;
    }
  };
  
  
  export { getDrafts, createDraft, getDraftDetails, getDraftboard, updateDraftboard };