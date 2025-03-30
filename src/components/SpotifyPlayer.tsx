import React, { useEffect, useState, useRef } from 'react';
import { Song } from '../types/Song';

interface PlayerProps {
  song: Song | null;
}

const SpotifyPlayer: React.FC<PlayerProps> = ({ song }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (song && audioRef.current) {
      // If we have a preview URL, play it
      if (song.preview_url) {
        audioRef.current.src = song.preview_url;
        audioRef.current.play().catch(err => console.error('Playback error:', err));
        setIsPlaying(true);
      } else {
        console.warn('No preview available for this track');
        setIsPlaying(false);
      }
    }
  }, [song]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.error('Playback error:', err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!song) return null;

  return (
    <div className="win98-window p-2 mt-4">
      <div className="flex items-center space-x-2">
        {song.albumArt && (
          <img src={song.albumArt} alt={song.album} className="w-12 h-12" />
        )}
        <div>
          <div className="font-bold">{song.title}</div>
          <div className="text-sm">{song.artist}</div>
        </div>
        <button 
          className="win98-button ml-auto" 
          onClick={handlePlayPause}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
      <audio ref={audioRef} />
    </div>
  );
};

export default SpotifyPlayer;