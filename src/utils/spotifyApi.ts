
import axios from 'axios';

// Client credentials flow for Spotify API
const getAccessToken = async (): Promise<string> => {
  try {
    // This should be handled server-side in production
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID || process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET || process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      console.error('Spotify credentials missing');
      return '';
    }

    // For demo purposes - in real app, this should be done server-side
    const tokenResponse = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`)
      },
      data: 'grant_type=client_credentials'
    });

    return tokenResponse.data.access_token;
  } catch (error) {
    console.error('Error getting Spotify access token:', error);
    return '';
  }
};

export const searchSpotify = async (query: string, type = 'track', limit = 20): Promise<any[]> => {
  try {
    const accessToken = await getAccessToken();
    
    if (!accessToken) {
      console.error('No access token available');
      return [];
    }

    const response = await axios({
      method: 'get',
      url: `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=${type}&limit=${limit}`,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (type === 'track') {
      return response.data.tracks.items.map((track: any) => transformTrackToSong(track));
    }
    
    return response.data;
  } catch (error) {
    console.error('Error searching Spotify:', error);
    return [];
  }
};

export const getRecommendations = async (limit = 30): Promise<any[]> => {
  try {
    const accessToken = await getAccessToken();
    
    if (!accessToken) {
      console.error('No access token available');
      return [];
    }

    const response = await axios({
      method: 'get',
      url: `https://api.spotify.com/v1/recommendations?seed_genres=pop,rock,hip-hop&limit=${limit}`,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    return response.data.tracks.map((track: any) => transformTrackToSong(track));
  } catch (error) {
    console.error('Error getting recommendations from Spotify:', error);
    return [];
  }
};

// Helper function to transform Spotify track data to our Song type
export const transformTrackToSong = (track: any) => {
  return {
    id: track.id,
    title: track.name,
    artist: track.artists.map((artist: any) => artist.name).join(', '),
    filename: `${track.artists[0]?.name} - ${track.name}.mp3`,
    filesize: Math.floor(Math.random() * 5000000) + 3000000, // Random filesize for display
    bitrate: 320, // Typical Spotify quality
    frequency: 44.1, // kHz
    length: msToMinutesAndSeconds(track.duration_ms),
    ping: Math.floor(Math.random() * 20) + 10, // Mock ping value
    album: track.album?.name,
    albumArt: track.album?.images?.[0]?.url,
    preview_url: track.preview_url,
    uri: track.uri
  };
};

// Helper function to convert milliseconds to minutes:seconds format
export const msToMinutesAndSeconds = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds.padStart(2, '0')}`;
};

// Create a collection of mock songs from a fixed set of queries
export const getMockSongsList = async (): Promise<any[]> => {
  try {
    // Try to get from Spotify
    const songs = await getRecommendations(30);
    if (songs.length > 0) {
      return songs;
    }
    
    // If Spotify fails, use local mock data
    return [];
  } catch (error) {
    console.error('Error getting mock songs list:', error);
    return [];
  }
};
