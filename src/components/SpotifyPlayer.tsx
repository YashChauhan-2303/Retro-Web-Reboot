import React, { useEffect, useState, useRef } from 'react';
import { Song } from '../types/Song';

interface PlayerProps {
  song: Song | null;
}

const SpotifyPlayer: React.FC<PlayerProps> = ({ song }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (song && audioRef.current) {
      // Reset error state
      setError(null);
      
      // For mock data or when preview URL is not available
      if (!song.preview_url) {
        setError("No preview available for this track");
        setIsPlaying(false);
        return;
      }
      
      // If we have a preview URL, play it
      audioRef.current.src = song.preview_url;
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(err => {
          console.error('Playback error:', err);
          setError("Could not play this track");
          setIsPlaying(false);
        });
    }
  }, [song]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play()
          .catch(err => {
            console.error('Playback error:', err);
            setError("Could not play this track");
          });
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!song) return null;

  const songTitle = song.title || song.filename.split(' - ')[1]?.replace('.mp3', '') || song.filename;
  const songArtist = song.artist || song.filename.split(' - ')[0]?.replace('MP3-(', '') || 'Unknown Artist';

  return (
    <div className="win98-window p-2 mt-4">
      <div className="flex items-center space-x-2">
        {song.albumArt && (
          <img src={song.albumArt} alt={song.album} className="w-12 h-12" />
        )}
        <div>
          <div className="font-bold">{songTitle}</div>
          <div className="text-sm">{songArtist}</div>
          {error && <div className="text-red-500 text-xs">{error}</div>}
        </div>
        <button 
          className="win98-button ml-auto" 
          onClick={handlePlayPause}
          disabled={!song.preview_url}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
      <audio ref={audioRef} />
    </div>
  );
};

export default SpotifyPlayer;