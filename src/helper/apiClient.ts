/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

import axios from 'axios';
import supabase from './supabaseClient';

// Create axios instance with baseURL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth tokens
api.interceptors.request.use(async (config) => {
  // Get session from Supabase
  const { data } = await supabase.auth.getSession();
  
  // If we have a session with an access token, add it to the request
  if (data.session?.access_token) {
    config.headers.Authorization = `Bearer ${data.session.access_token}`;
  }
  
  return config;
});

// Example API methods
export const fetchProfile = async () => {
  try {
    const response = await api.get('/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

export const fetchData = async () => {
  try {
    const response = await api.get('/data');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const createItem = async (data: any) => {
  try {
    const response = await api.post('/data', data);
    return response.data;
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
};

export default api;