
import { Song } from '../types/Song';
import { getMockSongsList } from '../utils/spotifyApi';

// This will be populated from Spotify on app initialization
export let mockSongs: Song[] = [];

// Initialize mock songs from Spotify
export const initializeMockSongs = async () => {
  const songs = await getMockSongsList();
  if (songs.length > 0) {
    mockSongs = songs;
  }
  return mockSongs;
};

// Helper function to search for songs in the mock list
export const searchMockSongs = (query: string): Song[] => {
  if (!query || query.trim() === '') return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return mockSongs.filter(song => {
    const title = song.title?.toLowerCase() || '';
    const artist = song.artist?.toLowerCase() || '';
    const filename = song.filename.toLowerCase();
    
    return title.includes(normalizedQuery) || 
           artist.includes(normalizedQuery) || 
           filename.includes(normalizedQuery);
  });
};

// Helper function to search by title and artist
export const searchMockSongsByTitleAndArtist = (titleQuery: string, artistQuery: string): Song[] => {
  if ((!titleQuery || titleQuery.trim() === '') && (!artistQuery || artistQuery.trim() === '')) {
    return [];
  }
  
  const normalizedTitleQuery = titleQuery.toLowerCase().trim();
  const normalizedArtistQuery = artistQuery.toLowerCase().trim();
  
  return mockSongs.filter(song => {
    const title = song.title?.toLowerCase() || '';
    const artist = song.artist?.toLowerCase() || '';
    
    const matchesTitle = normalizedTitleQuery === '' || title.includes(normalizedTitleQuery);
    const matchesArtist = normalizedArtistQuery === '' || artist.includes(normalizedArtistQuery);
    
    return matchesTitle && matchesArtist;
  });
};
