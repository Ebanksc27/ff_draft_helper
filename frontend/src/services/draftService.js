import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; 

// Get all drafts
const getDrafts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/drafts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching drafts:', error);
    throw error;
  }
};

// Create a new draft
const createDraft = async (draftData) => {
  try {
    const response = await axios.post(`${BASE_URL}/drafts/create`, draftData);
    return response.data;
  } catch (error) {
    console.error('Error creating draft:', error);
    throw error;
  }
};

// Get draft details by ID
const getDraftDetails = async (draftId) => {
  try {
    const response = await axios.get(`${BASE_URL}/drafts/${draftId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching draft details:', error);
    throw error;
  }
};

export { getDrafts, createDraft, getDraftDetails };

