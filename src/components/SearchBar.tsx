
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: {artist: string, title: string, maxResults: number}) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [maxResults, setMaxResults] = useState(100);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ artist, title, maxResults });
  };

  const handleClearFields = () => {
    setArtist('');
    setTitle('');
    setMaxResults(100);
  };

  const toggleAdvanced = () => {
    setShowAdvanced(!showAdvanced);
  };

  return (
    <div className="mb-2">
      <div className="bg-[#c0c0c0] p-2 border-2 border-solid border-t-[#dfdfdf] border-l-[#dfdfdf] border-b-[#808080] border-r-[#808080]">
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
          <div className="flex items-center">
            <label htmlFor="artist" className="w-28 text-right mr-2">Artist:</label>
            <input 
              id="artist"
              type="text" 
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              className="flex-1 border border-[#808080] bg-white px-1 py-0.5"
            />
          </div>
          
          <div className="flex items-center">
            <label htmlFor="title" className="w-28 text-right mr-2">Title:</label>
            <input 
              id="title"
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 border border-[#808080] bg-white px-1 py-0.5"
            />
          </div>
          
          <div className="flex items-center">
            <label htmlFor="maxResults" className="w-28 text-right mr-2">Max Results:</label>
            <input 
              id="maxResults"
              type="text" 
              value={maxResults}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value) && value > 0) {
                  setMaxResults(value);
                } else if (e.target.value === '') {
                  setMaxResults(0);
                }
              }}
              className="flex-1 border border-[#808080] bg-white px-1 py-0.5"
            />
          </div>
          
          <div className="flex justify-end gap-1 col-span-2 mt-1">
            <button 
              type="button" 
              onClick={handleSearch}
              className="win98-button w-24"
            >
              Find it!
            </button>
            <button 
              type="button" 
              onClick={handleClearFields}
              className="win98-button w-24"
            >
              Clear Fields
            </button>
            <button 
              type="button" 
              onClick={toggleAdvanced}
              className="win98-button w-24"
            >
              Advanced {showAdvanced ? '<<' : '>>'}
            </button>
          </div>
          
          {showAdvanced && (
            <div className="col-span-2 mt-1 border-t pt-2 border-[#808080]">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-1" />
                    <span>Include Alternative Sources</span>
                  </label>
                </div>
                <div className="flex items-center">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-1" />
                    <span>Only High Quality</span>
                  </label>
                </div>
                <div className="flex items-center">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-1" />
                    <span>Filter Explicit</span>
                  </label>
                </div>
                <div className="flex items-center">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-1" />
                    <span>Prefer Connected Users</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
