
import React from 'react';
import { Song } from '../SongList';

interface HotListTabProps {
  songs: Song[];
  onSongSelect: (song: Song) => void;
}

const HotListTab = ({ songs, onSongSelect }: HotListTabProps) => {
  const hotSongs = songs.slice(0, 8); // Just use a subset of songs for hot list

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
            {hotSongs.map((song, index) => (
              <tr 
                key={song.id} 
                className={`hot-list-row ${index === 2 ? 'active-row' : ''}`} 
                onClick={() => onSongSelect(song)}
              >
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
          <button className="win98-button">Download Selected Song(s)</button>
          <button className="win98-button">Refresh Hot List</button>
        </div>
      </div>
    </div>
  );
};

export default HotListTab;
