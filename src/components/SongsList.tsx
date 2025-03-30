import React, { useEffect, useState } from 'react';
import { formatFileSize } from '../utils/formatters';
import axios from 'axios';
import SpotifyPlayer from './SpotifyPlayer';
import { Song } from '../types/Song';

interface SongsListProps {
  onSongSelect: (song: Song) => void;
}

const SongsList: React.FC<SongsListProps> = ({ onSongSelect }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch songs from your server that gets Spotify data
    const fetchSongs = async () => {
      try {
        setLoading(true);
        // You can use either search or recommendations endpoint
        const response = await axios.get('/api/spotify/recommendations');
        setSongs(response.data.songs);
        setError(null);
      } catch (err) {
        console.error('Error fetching songs:', err);
        setError('Failed to load songs from Spotify');
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