const API_BASE_URL =  'https://ai-image-genrator-seven.vercel.app/api' || 'http://localhost:3000/api';
// "https://ai-image-genrator-seven.vercel.app/api"

// src/services/apiService.ts
export const getSession = async (userId: string) => {
  try {
    
    const response = await fetch(`${API_BASE_URL}/get-session?userId=${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch session data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching session data:', error);
    throw error;
  }
};



export const checkRateLimit = async (userId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/rate-limit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error checking rate limit:', error);
    throw error;
  }
};

export const saveHistory = async (userId: string, imageId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/save-history`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, imageId }),
    });

    if (!response.ok) {
      throw new Error('Failed to save history');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error saving history:', error);
    throw error;
  }
};

export const getTrendingImages = async () => {
  const response = await fetch(`${API_BASE_URL}/get-trending`);
  if (!response.ok) {
    throw new Error('Failed to fetch trending images');
  }
  return response.json();
};

export const getHistory = async (userId: string) => {
  const response = await fetch(`${API_BASE_URL}/get-history?userId=${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch history');
  }
  return response.json();
};

// New function to set session data
export const setSession = async (userId: string, sessionData: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/set-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, sessionData }),
    });

    if (!response.ok) {
      throw new Error('Failed to set session data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error setting session:', error);
    throw error;
  }
};
