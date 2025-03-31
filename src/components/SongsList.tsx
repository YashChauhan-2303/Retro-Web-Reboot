import React, { useState, useRef } from 'react';
import SpotifyPlayer from './SpotifyPlayer';

// Import audio files
// Note: You'll need to replace these with your actual file names
import bohemianRhapsody from '../Song/IshqMein.mp3';
import billieJean from '../Song/JaaneTu.mp3';
import hotelCalifornia from '../Song/ShoppingList.mp3';

interface Song {
  id: number;
  filename: string;
  filesize: number;
  length: string;
  user: string;
  ping: string;
  isHighlighted: boolean;
  audioPath: string;
}

const SongsList: React.FC = () => {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Define the 3 specific songs you want to display with imported file paths
  const songsList: Song[] = [
    {
      id: 1,
      filename: "Bohemian Rhapsody - Queen.mp3",
      filesize: 9812345,
      length: "5:55",
      user: "MusicLover99",
      ping: "122ms",
      isHighlighted: false,
      audioPath: bohemianRhapsody
    },
    {
      id: 2,
      filename: "Billie Jean - Michael Jackson.mp3",
      filesize: 8723456,
      length: "4:54",
      user: "KingOfPop",
      ping: "98ms",
      isHighlighted: true,
      audioPath: billieJean
    },
    {
      id: 3,
      filename: "Hotel California - Eagles.mp3",
      filesize: 10234567,
      length: "6:30",
      user: "ClassicRock",
      ping: "135ms",
      isHighlighted: false,
      audioPath: hotelCalifornia
    }
  ];

  // Rest of the component remains the same...

  const handleSongClick = (song: Song) => {
    // If clicking the same song that's already selected
    if (selectedSong && selectedSong.id === song.id) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      // If selecting a new song
      setSelectedSong(song);
      setIsPlaying(true);
      
      // Allow time for state update before playing
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().catch(err => {
            console.error("Error playing audio:", err);
            setIsPlaying(false);
          });
        }
      }, 100);
    }
  };

  // Handle audio ending
  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Audio element (hidden) */}
      <audio 
        ref={audioRef}
        src={selectedSong?.audioPath} 
        onEnded={handleAudioEnd}
        hidden
      />

      {/* Local Songs List */}
      <div className="overflow-auto flex-grow win98-inset bg-white">
        <table className="napster-list w-full text-sm">
          <thead>
            <tr>
              <th>Status</th>
              <th>Filename</th>
              <th>Size</th>
              <th>Length</th>
              <th>User</th>
              <th>Ping</th>
            </tr>
          </thead>
          <tbody>
            {songsList.map((song) => (
              <tr
                key={song.id}
                className={`cursor-pointer ${song.isHighlighted ? 'highlighted' : ''} ${selectedSong?.id === song.id ? 'bg-[#0A246A] text-white' : ''}`}
                onClick={() => handleSongClick(song)}
              >
                <td>
                  {selectedSong?.id === song.id && isPlaying ? 
                    '▶️' : 
                    selectedSong?.id === song.id ? '⏸️' : ''}
                </td>
                <td>{song.filename}</td>
                <td>{(song.filesize / 1024 / 1024).toFixed(2)} MB</td>
                <td>{song.length}</td>
                <td>{song.user}</td>
                <td>{song.ping}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Player controls - shown only when a song is selected */}
      {selectedSong && (
        <div className="border p-3 bg-napsterGray mt-2">
          <div className="font-bold mb-2">Now Playing: {selectedSong.filename}</div>
          <div className="flex space-x-2">
            <button 
              className="win98-button px-4"
              onClick={() => {
                if (isPlaying) {
                  audioRef.current?.pause();
                  setIsPlaying(false);
                } else {
                  audioRef.current?.play();
                  setIsPlaying(true);
                }
              }}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button 
              className="win98-button px-4"
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.currentTime = 0;
                  audioRef.current.pause();
                  setIsPlaying(false);
                }
              }}
            >
              Stop
            </button>
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-gray-300 my-4"></div>

      {/* Spotify Integration Section */}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-4">Spotify Integration</h3>
        <p className="mb-4">
          This app is connected to Spotify. You can authenticate using the Spotify button 
          in the top bar, then click "Get Songs" to fetch your currently playing track.
        </p>
        <p>
          Your current Spotify playback information will appear below.
        </p>
      </div>
      
      {/* Display Spotify player */}
      <SpotifyPlayer />
    </div>
  );
};

export default SongsList;