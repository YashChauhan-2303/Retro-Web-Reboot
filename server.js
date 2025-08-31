import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import bodyParser from 'body-parser';
import fs from 'fs';
import fetch from 'node-fetch';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
let supabase;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log('Supabase client initialized');
} else {
  console.warn('Supabase credentials missing. Supabase functionality will not work.');
}

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Function to exchange authorization code for access token
async function exchangeCodeForToken(authCode) {
  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI || 'http://localhost:5001/callback';
    
    // Create base64 encoded auth string
    const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    
    // Make request to Spotify token endpoint
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: authCode,
        redirect_uri: redirectUri,
      }),
    });
    
    const data = await response.json();
    
    // Add creation timestamp for expiration tracking
    const tokenDataWithTimestamp = {
      ...data,
      created_at: Date.now()
    };

    // Save token response to file
    fs.writeFileSync('spotify_tokens.json', JSON.stringify(tokenDataWithTimestamp, null, 2));
    console.log('Spotify tokens saved to spotify_tokens.json');
    
    return tokenDataWithTimestamp;
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    throw error;
  }
}

// Route to handle Spotify callback and save authorization code
app.get('/callback', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send('Authorization code not found');
  }

  console.log('Authorization Code:', code);

  // Save the code to a file
  fs.writeFileSync('auth_code.txt', code);
  console.log('Authorization code saved to auth_code.txt');
  
  try {
    // Exchange code for token immediately after callback
    const tokenData = await exchangeCodeForToken(code);
    res.send('Authorization successful! Access token received and saved.');
  } catch (error) {
    console.error('Failed to exchange auth code for token:', error);
    res.status(500).send('Authorization successful, but failed to exchange code for token.');
  }
});

// Endpoint to manually trigger token exchange
app.post('/api/exchange-token', async (req, res) => {
  try {
    // Read auth code from file
    const authCode = fs.readFileSync('auth_code.txt', 'utf-8').trim();
    
    // Exchange code for token
    const tokenData = await exchangeCodeForToken(authCode);
    
    res.json({ success: true, message: 'Token exchange successful' });
  } catch (error) {
    console.error('Error in token exchange endpoint:', error);
    res.status(500).json({ error: 'Failed to exchange token' });
  }
});

// User profile route - protected by auth
app.get('/api/profile', async (req, res) => {
  if (!supabase) {
    return res.status(503).json({ error: 'Supabase service unavailable' });
  }

  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    // Verify the JWT with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    // Get user profile data from your database
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();
      
    if (profileError) {
      return res.status(500).json({ error: profileError.message });
    }
    
    res.json({ profile });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Example of a simple data endpoint
app.get('/api/data', async (req, res) => {
  try {
    // Replace this with your actual data retrieval logic
    const { data, error } = await supabase
      .from('your_table_name')
      .select('*');
      
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    
    res.json({ data });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Example POST endpoint
app.post('/api/data', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('your_table_name')
      .insert([req.body]);
      
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    
    res.status(201).json({ success: true, data });
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Function to get the access token from saved tokens file
function getSpotifyAccessToken() {
  try {
    const tokenData = JSON.parse(fs.readFileSync('spotify_tokens.json', 'utf-8'));
    return tokenData.access_token;
  } catch (error) {
    console.error('Error reading Spotify tokens file:', error);
    throw new Error('Spotify access token not found');
  }
}

// Function to check if token is expired or about to expire
function isTokenExpired() {
  try {
    const tokenData = JSON.parse(fs.readFileSync('spotify_tokens.json', 'utf-8'));
    
    // If we don't have an expiration timestamp stored, create one
    if (!tokenData.created_at) {
      return true; // Assume expired if we don't know when it was created
    }
    
    const createdAt = tokenData.created_at;
    const expiresIn = tokenData.expires_in;
    const now = Date.now();
    
    // Check if token is expired or will expire in next 5 minutes
    const isExpired = now >= (createdAt + (expiresIn * 1000) - 300000); // 5 minutes buffer
    return isExpired;
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true; // Assume expired on error
  }
}

// Function to refresh the access token
async function refreshAccessToken() {
  try {
    // Read current tokens
    const tokenData = JSON.parse(fs.readFileSync('spotify_tokens.json', 'utf-8'));
    const refreshToken = tokenData.refresh_token;
    
    if (!refreshToken) {
      throw new Error('Refresh token not found');
    }
    
    // Get client credentials
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    
    // Create base64 encoded auth string
    const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    
    // Make request to Spotify token endpoint
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });
    
    const newTokenData = await response.json();
    
    if (newTokenData.error) {
      throw new Error(`Spotify API Error: ${newTokenData.error_description}`);
    }
    
    // Save new access token but keep the refresh token if not provided
    const updatedTokenData = {
      ...newTokenData,
      refresh_token: newTokenData.refresh_token || refreshToken, // Keep old refresh token if not provided
      created_at: Date.now() // Add timestamp for expiration check
    };
    
    // Save updated token data
    fs.writeFileSync('spotify_tokens.json', JSON.stringify(updatedTokenData, null, 2));
    console.log('Access token refreshed successfully');
    
    return updatedTokenData.access_token;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
}

// Enhanced function to get a valid access token (refresh if needed)
async function getValidSpotifyAccessToken() {
  try {
    // Check if token is expired
    if (isTokenExpired()) {
      console.log('Access token expired, refreshing...');
      return await refreshAccessToken();
    }
    
    // Token is still valid, return it
    const tokenData = JSON.parse(fs.readFileSync('spotify_tokens.json', 'utf-8'));
    return tokenData.access_token;
  } catch (error) {
    console.error('Error getting valid access token:', error);
    throw new Error('Failed to get valid Spotify access token');
  }
}

// Endpoint to get current playback state 
app.get('/api/spotify/playback', async (req, res) => {
  try {
    // Get a valid access token (auto-refreshes if needed)
    const accessToken = await getValidSpotifyAccessToken();
    
    // Make request to Spotify API
    const response = await fetch('https://api.spotify.com/v1/me/player', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    // Handle 204 No Content response (no active playback)
    if (response.status === 204) {
      const noContentData = { message: "No active playback session found" };
      fs.writeFileSync('spotify_playback_state.json', JSON.stringify(noContentData, null, 2));
      return res.json(noContentData);
    }
    
    // Handle error responses
    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json(errorData);
    }
    
    // Handle successful responses
    const data = await response.json();
    
    // Save response to file
    fs.writeFileSync('spotify_playback_state.json', JSON.stringify(data, null, 2));
    console.log('Playback state saved to spotify_playback_state.json');
    
    return res.json(data);
  } catch (error) {
    console.error('Error fetching playback state:', error);
    return res.status(500).json({ error: 'Failed to fetch playback state', details: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});


