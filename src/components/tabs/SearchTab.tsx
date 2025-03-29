
import React, { useState } from 'react';
import SearchBar from '../SearchBar';
import SongList, { Song } from '../SongList';

interface SearchTabProps {
  songs: Song[];
  onSongSelect: (song: Song) => void;
}

const SearchTab = ({ songs, onSongSelect }: SearchTabProps) => {
  const [filteredSongs, setFilteredSongs] = useState<Song[]>(songs);

  const handleSearch = (query: {artist: string, title: string, maxResults: number}) => {
    if (!query.artist.trim() && !query.title.trim()) {
      setFilteredSongs(songs);
      return;
    }
    
    const filtered = songs.filter(song => 
      (!query.artist.trim() || song.artist.toLowerCase().includes(query.artist.toLowerCase())) && 
      (!query.title.trim() || song.title.toLowerCase().includes(query.title.toLowerCase()))
    );
    
    // Apply max results
    setFilteredSongs(filtered.slice(0, query.maxResults));
  };

  return (
    <div className="flex flex-col h-full">
      <SearchBar onSearch={handleSearch} />
      <SongList 
        songs={filteredSongs} 
        onSongSelect={onSongSelect}
        className="flex-1" 
      />
    </div>
  );
};

export default SearchTab;
