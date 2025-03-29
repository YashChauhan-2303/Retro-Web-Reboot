
import React from 'react';
import { Song } from '../SongList';

interface LibraryTabProps {
  songs: Song[];
  onSongSelect: (song: Song) => void;
}

const LibraryTab = ({ songs, onSongSelect }: LibraryTabProps) => {
  return (
    <div className="h-full flex flex-col">
      <div className="win98-inset p-0.5 overflow-auto flex-1">
        <table className="w-full song-list">
          <thead>
            <tr className="bg-[#c0c0c0] text-left sticky top-0">
              <th className="py-0.5 px-2 border-r border-[#808080]">Filename</th>
              <th className="py-0.5 px-2 border-r border-[#808080] w-20">Size</th>
              <th className="py-0.5 px-2 border-r border-[#808080] w-14">Bitrate</th>
              <th className="py-0.5 px-2 border-r border-[#808080] w-14">Freq</th>
              <th className="py-0.5 px-2 w-14">Length</th>
            </tr>
          </thead>
          <tbody>
            {songs.slice(0, 12).map((song) => (
              <tr key={song.id} className="song-row" onClick={() => onSongSelect(song)}>
                <td>{`MP3\\${song.artist} - ${song.title}.mp3`}</td>
                <td>{song.size}</td>
                <td>{song.bitrate}</td>
                <td>44100</td>
                <td>{song.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-2 flex justify-between">
        <div className="flex gap-1">
          <button className="win98-button">Add to Library</button>
          <button className="win98-button">Remove Selected</button>
        </div>
        <div>
          <span className="text-xs mr-2">Total Files Shared: 127</span>
        </div>
      </div>
    </div>
  );
};

export default LibraryTab;
