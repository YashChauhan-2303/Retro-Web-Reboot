
import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Song } from './SongList';

interface PlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const Player = ({ currentSong, isPlaying, onTogglePlay, onPrev, onNext }: PlayerProps) => {
  return (
    <div className="flex justify-between items-center my-1 text-xs">
      <div className="flex gap-1">
        <button className="win98-button">Add to Computer</button>
        <button className="win98-button">Download Selected Song(s)</button>
      </div>
      <div>
        <button className="win98-button">Refresh Hot List</button>
      </div>
      <div className="flex gap-1">
        <button className="win98-button">Refresh Visible List</button>
        <button className="win98-button">Refresh Ping Time</button>
      </div>
    </div>
  );
};

export default Player;
