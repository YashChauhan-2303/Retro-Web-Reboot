import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Song } from '../../types/Song'; 
import axios from 'axios';

const SearchTab = () => {
  const [searchTitle, setSearchTitle] = useState('');
  const [searchArtist, setSearchArtist] = useState('');
  const [maxResults, setMaxResults] = useState(100);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  
  const handleSearch = () => {
    if (searchTitle.trim() || searchArtist.trim()) {
      setIsSearching(true);
      
      // Use Spotify API instead of mock data
      axios.get(`/api/spotify/search?query=${searchTitle || searchArtist}&type=track&limit=${maxResults}`)
        .then(response => {
          setSearchResults(response.data.songs);
          setIsSearching(false);
        })
        .catch(error => {
          console.error('Error searching songs:', error);
          setIsSearching(false);
        });
    }
  };

  const handleClear = () => {
    setSearchTitle('');
    setSearchArtist('');
    setSearchResults([]);
    setIsSearching(false);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col">
      <div className="bg-napsterGray p-2 border-b border-napsterDarkGray">
        <div className="flex items-center mb-2">
          <div className="w-24 mr-2">Search Title:</div>
          <Input 
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-grow"
            placeholder="Enter song title"
          />
        </div>
        
        <div className="flex items-center mb-2">
          <div className="w-24 mr-2">Search Artist:</div>
          <Input 
            value={searchArtist}
            onChange={(e) => setSearchArtist(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-grow"
            placeholder="Enter artist name"
          />
        </div>
        
        <div className="flex items-center mb-2">
          <div className="w-24 mr-2">Max Results:</div>
          <Input 
            type="number"
            value={maxResults}
            onChange={(e) => setMaxResults(Number(e.target.value))}
            className="w-24"
            min={1}
            max={1000}
          />
        </div>
        
        <div className="flex justify-between">
          <div className="space-x-2">
            <button className="win98-button flex items-center" onClick={handleSearch}>
              <Search size={14} className="mr-1" /> Find!
            </button>
            <button className="win98-button flex items-center" onClick={handleClear}>
              <X size={14} className="mr-1" /> Clear Search
            </button>
          </div>
          <div className="space-x-2">
            <button className="win98-button flex items-center">
              <ChevronLeft size={14} className="mr-1" /> Previous
            </button>
            <button className="win98-button flex items-center">
              <ChevronRight size={14} className="mr-1" /> Next
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex-grow win98-inset bg-white overflow-auto">
        {isSearching ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="mb-2">Searching...</div>
              <div>Please wait while Napster searches for your query</div>
            </div>
          </div>
        ) : searchResults.length > 0 ? (
          <table className="napster-list w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Artist</th>
                <th>Size</th>
                <th>Bitrate</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((result, index) => (
                <tr key={index} className={index === 0 ? 'highlighted' : ''}>
                  <td>{result.title}</td>
                  <td>{result.artist}</td>
                  <td>{result.filesize}</td>
                  <td>{result.bitrate}</td>
                  {/* <td>{result.time}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-4 text-center">
            <div>Enter search criteria and click "Find!" to search for files</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchTab;
