
import React from 'react';

export interface Song {
  id: string;
  title: string;
  artist: string;
  bitrate: string;
  size: string;
  duration: string;
  user: string;
  connection?: string;
  ping?: string;
}

interface SongListProps {
  songs: Song[];
  onSongSelect: (song: Song) => void;
  className?: string;
}

const SongList = ({ songs, onSongSelect, className = '' }: SongListProps) => {
  // Function to determine status dot color based on connection
  const getStatusDot = (connection?: string) => {
    if (!connection || connection === 'Unknown') return 'status-dot status-dot-red';
    if (connection === '56K') return 'status-dot status-dot-yellow';
    return 'status-dot status-dot-green';
  };

  return (
    <div className={`win98-inset p-0.5 overflow-auto ${className}`}>
      <table className="w-full song-list">
        <thead>
          <tr className="bg-[#c0c0c0] text-left sticky top-0">
            <th className="py-0.5 px-2 border-r border-[#808080]">Filename</th>
            <th className="py-0.5 px-2 border-r border-[#808080] w-20">Filesize</th>
            <th className="py-0.5 px-2 border-r border-[#808080] w-14">Bitrate</th>
            <th className="py-0.5 px-2 border-r border-[#808080] w-14">Freq</th>
            <th className="py-0.5 px-2 border-r border-[#808080] w-14">Length</th>
            <th className="py-0.5 px-2 border-r border-[#808080] w-24">User</th>
            <th className="py-0.5 px-2 border-r border-[#808080] w-24">Connection</th>
            <th className="py-0.5 px-2 w-12">Ping</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr key={song.id} className="song-row" onClick={() => onSongSelect(song)}>
              <td className="flex items-center">
                <span className={getStatusDot(song.connection)}></span>
                {song.artist && song.title ? `Music\\${song.artist} - ${song.title}.mp3` : song.title}
              </td>
              <td>{song.size}</td>
              <td>{song.bitrate}</td>
              <td>44100</td>
              <td>{song.duration}</td>
              <td>{song.user}</td>
              <td>{song.connection || 'Unknown'}</td>
              <td>{song.ping || '~'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SongList;
