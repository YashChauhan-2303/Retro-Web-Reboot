
import React, { useEffect, useState } from 'react';
import { formatFileSize } from '../utils/formatters';
import SpotifyPlayer from './SpotifyPlayer';
import { Song } from '../types/Song';
import { getRecommendations } from '../utils/spotifyApi';
import { initializeMockSongs, mockSongs } from '../data/mockSongList';

interface SongsListProps {
  onSongSelect: (song: Song) => void;
}

const SongsList: React.FC<SongsListProps> = ({ onSongSelect }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch songs from Spotify using our utility
    const fetchSongs = async () => {
      try {
        setLoading(true);
        
        // Try to get songs from Spotify
        const spotifySongs = await getRecommendations(30);
        
        if (spotifySongs.length > 0) {
          setSongs(spotifySongs);
          // Also initialize our mock list for search functionality
          await initializeMockSongs();
          setError(null);
        } else {
          // If no Spotify songs, use mock data if available
          if (mockSongs.length > 0) {
            setSongs(mockSongs);
          } else {
            setError('Could not load songs');
          }
        }
      } catch (err) {
        console.error('Error fetching songs:', err);
        setError('Could not connect to Spotify API');
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
    // Try to get new recommendations from Spotify
    getRecommendations(30)
      .then(newSongs => {
        if (newSongs.length > 0) {
          setSongs(newSongs);
        } else {
          // If no new recommendations, shuffle existing songs
          setSongs([...songs].sort(() => Math.random() - 0.5));
        }
      })
      .catch(() => {
        // If failed, just shuffle existing songs
        setSongs([...songs].sort(() => Math.random() - 0.5));
      });
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
