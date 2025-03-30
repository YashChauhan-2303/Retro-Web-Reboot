import React, { useEffect, useState } from 'react';
import { formatFileSize } from '../utils/formatters';
import axios from 'axios';
import SpotifyPlayer from './SpotifyPlayer';
import { Song } from '../types/Song';
// Import mock data as fallback
//import { song as mockSongs } from '../data/songs';

interface SongsListProps {
  onSongSelect: (song: Song) => void;
}

const SongsList: React.FC<SongsListProps> = ({ onSongSelect }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    // Fetch songs from your server that gets Spotify data
    const fetchSongs = async () => {
      try {
        setLoading(true);
        // Try to get from Spotify API
        const response = await axios.get('/api/spotify/recommendations', { timeout: 5000 });
        
        // Transform response to ensure it fits our expected format
        const formattedSongs = response.data.songs.map((song: any) => ({
          ...song,
          // Ensure required fields exist
          filename: song.filename || `${song.artist} - ${song.title}.mp3`,
          filesize: song.filesize || '~7MB',
          bitrate: song.bitrate || '320kbps',
          frequency: song.frequency || '44.1kHz',
          ping: song.ping || Math.floor(Math.random() * 100) + 10
        }));
        
        setSongs(formattedSongs);
        setUsingMockData(false);
        setError(null);
      } catch (err) {
        console.error('Error fetching songs from Spotify, falling back to mock data:', err);
        // Fall back to mock data
        //setSongs(mockSongs);
        setUsingMockData(true);
        setError('Could not connect to Spotify API, using local song data');
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  const handleSongClick = (song: Song) => {
    setSelectedSong(song);
    onSongSelect(song);
    
    // Update songs list to highlight the selected song
    setSongs(songs.map(s => ({
      ...s,
      isHighlighted: s.id === song.id
    })));
  };

  const handleDownload = () => {
    if (selectedSong) {
      console.log(`Started download: ${selectedSong.filename}`);
    }
  };

  const handleRefreshList = () => {
    console.log("Refreshing visible list...");
    // Simulate refresh by shuffling the order
    setSongs([...songs].sort(() => Math.random() - 0.5));
  };

  const handleRefreshPing = () => {
    console.log("Refreshing ping times...");
    
    // Update ping times with slight variations
    setSongs(songs.map(song => ({
      ...song,
      ping: song.ping > 0 ? song.ping + Math.floor(Math.random() * 10) - 5 : 0
    })));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="overflow-auto flex-grow win98-inset bg-white">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <table className="napster-list text-sm">
            <thead>
              <tr>
                <th>Filename</th>
                <th>Filesize</th>
                <th>Bitrate</th>
                <th>Frequency</th>
                <th>Length</th>
                <th>Ping</th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song) => (
                <tr 
                  key={song.id}
                  className={song.isHighlighted ? "highlighted" : ""}
                  onClick={() => handleSongClick(song)}
                >
                  <td>{song.filename}</td>
                  <td>{formatFileSize(song.filesize)}</td>
                  <td>{song.bitrate}</td>
                  <td>{song.frequency}</td>
                  <td>{song.length}</td>
                  <td>{song.ping}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="flex justify-between mt-2">
        <div>
          <button className="win98-button mr-2" onClick={handleDownload}>Download Selected Song(s)</button>
        </div>
        <div className="flex items-center space-x-2">
          <button className="win98-button" onClick={handleRefreshList}>Refresh Visible List</button>
          <button className="win98-button" onClick={handleRefreshPing}>Refresh Ping Time</button>
        </div>
      </div>
      {selectedSong && <SpotifyPlayer song={selectedSong} />}
    </div>
  );
};

export default SongsList;