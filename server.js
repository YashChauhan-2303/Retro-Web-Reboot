import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import bodyParser from 'body-parser';
import SpotifyWebApi from 'spotify-web-api-node';

// Load environment variables
dotenv.config();

// Spotify API credentials
process.env.SPOTIFY_CLIENT_ID = 'your_spotify_client_id';
process.env.SPOTIFY_CLIENT_SECRET = 'your_spotify_client_secret';
process.env.SPOTIFY_REDIRECT_URI = 'http://localhost:3000/callback';

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

// Initialize Spotify API client
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI
});

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
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

// Spotify Authentication Routes
app.get('/api/spotify/login', (req, res) => {
  const scopes = [
    'user-read-private',
    'user-read-email',
    'user-top-read',
    'user-read-recently-played',
    'streaming',
    'user-library-read',
    'user-library-modify',
    'playlist-read-private',
    'playlist-modify-public',
    'playlist-modify-private'
  ];
  
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes, '');
  res.json({ url: authorizeURL });
});

app.post('/api/spotify/callback', async (req, res) => {
  const { code } = req.body;
  
  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    
    // Save the access token, refresh token, and expiry time
    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi.setRefreshToken(data.body['refresh_token']);
    
    // You might want to store these tokens in your database for the user
    // associated with the current session/auth
    
    res.json({
      accessToken: data.body['access_token'],
      expiresIn: data.body['expires_in']
    });
  } catch (error) {
    console.error('Spotify auth error:', error);
    res.status(400).json({ error: 'Failed to authenticate with Spotify' });
  }
});

// Spotify API endpoints
app.get('/api/spotify/me', async (req, res) => {
  try {
    const data = await spotifyApi.getMe();
    res.json(data.body);
  } catch (error) {
    console.error('Error getting Spotify profile:', error);
    res.status(500).json({ error: 'Failed to get Spotify profile' });
  }
});

app.get('/api/spotify/top-tracks', async (req, res) => {
  try {
    const data = await spotifyApi.getMyTopTracks({ limit: 10 });
    res.json(data.body);
  } catch (error) {
    console.error('Error getting top tracks:', error);
    res.status(500).json({ error: 'Failed to get top tracks' });
  }
});

app.post('/api/spotify/refresh-token', async (req, res) => {
  try {
    const data = await spotifyApi.refreshAccessToken();
    spotifyApi.setAccessToken(data.body['access_token']);
    
    res.json({
      accessToken: data.body['access_token'],
      expiresIn: data.body['expires_in']
    });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(500).json({ error: 'Failed to refresh token' });
  }
});

// Search for songs on Spotify
app.get('/api/spotify/search', async (req, res) => {
  const { query, type = 'track', limit = 20 } = req.query;
  
  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }
  
  try {
    const data = await spotifyApi.search(query, [type], { limit });
    
    // Transform Spotify track data to match your frontend structure
    if (type === 'track' && data.body.tracks) {
      const songs = data.body.tracks.items.map((track) => ({
        id: track.id,
        title: track.name,
        artist: track.artists.map(artist => artist.name).join(', '),
        filesize: '~7MB', // Spotify doesn't provide file size
        bitrate: '320kbps', // Spotify premium quality
        frequency: '44.1kHz',
        length: msToMinutesAndSeconds(track.duration_ms),
        ping: Math.floor(Math.random() * 20) + 10, // Mock ping value
        album: track.album.name,
        albumArt: track.album.images[0]?.url,
        preview_url: track.preview_url,
        uri: track.uri
      }));
      
      return res.json({ songs });
    }
    
    res.json(data.body);
  } catch (error) {
    console.error('Error searching Spotify:', error);
    res.status(500).json({ error: 'Failed to search Spotify' });
  }
});

// Get recommended tracks
app.get('/api/spotify/recommendations', async (req, res) => {
  try {
    // Check if Spotify API is properly configured
    if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
      return res.status(500).json({ error: 'Spotify API not configured' });
    }

    // Try to get a client credentials token if we don't have one yet
    if (!spotifyApi.getAccessToken()) {
      try {
        const data = await spotifyApi.clientCredentialsGrant();
        spotifyApi.setAccessToken(data.body['access_token']);
      } catch (tokenError) {
        console.error('Error getting Spotify token:', tokenError);
        return res.status(500).json({ error: 'Failed to authenticate with Spotify' });
      }
    }

    // Get recommendations based on seed genres
    const data = await spotifyApi.getRecommendations({
      seed_genres: ['pop', 'rock', 'hip-hop'],
      limit: 30
    });
    
    const songs = data.body.tracks.map((track) => ({
      id: track.id,
      title: track.name,
      artist: track.artists.map(artist => artist.name).join(', '),
      filename: `${track.artists[0]?.name} - ${track.name}.mp3`,
      filesize: '~7MB',
      bitrate: '320kbps',
      frequency: '44.1kHz',
      length: msToMinutesAndSeconds(track.duration_ms),
      ping: Math.floor(Math.random() * 20) + 10,
      album: track.album.name,
      albumArt: track.album.images[0]?.url,
      preview_url: track.preview_url,
      uri: track.uri
    }));
    
    res.json({ songs });
  } catch (error) {
    console.error('Error getting recommendations:', error);
    res.status(500).json({ error: 'Failed to get recommendations' });
  }
});

// Get a specific track by ID
app.get('/api/spotify/track/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const data = await spotifyApi.getTrack(id);
    const track = data.body;
    
    res.json({
      id: track.id,
      title: track.name,
      artist: track.artists.map(artist => artist.name).join(', '),
      filesize: '~7MB',
      bitrate: '320kbps',
      frequency: '44.1kHz',
      length: msToMinutesAndSeconds(track.duration_ms),
      ping: Math.floor(Math.random() * 20) + 10,
      filename: `${track.artists[0]?.name} - ${track.name}.mp3`,
      album: track.album.name,
      albumArt: track.album.images[0]?.url,
      preview_url: track.preview_url,
      uri: track.uri
    });
  } catch (error) {
    console.error('Error getting track:', error);
    res.status(500).json({ error: 'Failed to get track' });
  }
});

// Helper function to convert milliseconds to minutes:seconds format
function msToMinutesAndSeconds(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});