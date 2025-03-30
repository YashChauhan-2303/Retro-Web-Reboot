
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Song } from '../../types/Song';
import { searchSpotify } from '../../utils/spotifyApi';
import { searchMockSongsByTitleAndArtist, initializeMockSongs } from '../../data/mockSongList';
import SpotifyPlayer from '../SpotifyPlayer';

const SearchTab = () => {
  const [searchTitle, setSearchTitle] = useState('');
  const [searchArtist, setSearchArtist] = useState('');
  const [maxResults, setMaxResults] = useState(100);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 20;
  
  useEffect(() => {
    // Initialize mock songs when component loads
    initializeMockSongs();
  }, []);
  
  const handleSearch = async () => {
    if (searchTitle.trim() || searchArtist.trim()) {
      setIsSearching(true);
      
      try {
        let results: Song[] = [];
        
        // First try local search
        results = searchMockSongsByTitleAndArtist(searchTitle, searchArtist);
        
        // If local search yields no results, try Spotify API
        if (results.length === 0) {
          const query = searchTitle || searchArtist;
          const spotifyResults = await searchSpotify(query, 'track', maxResults);
          if (spotifyResults && spotifyResults.length > 0) {
            results = spotifyResults;
          }
        }
        
        setSearchResults(results);
        setCurrentPage(1);
      } catch (error) {
        console.error('Error during search:', error);
      } finally {
        setIsSearching(false);
      }
    }
  };

  const handleClear = () => {
    setSearchTitle('');
    setSearchArtist('');
    setSearchResults([]);
    setSelectedSong(null);
    setIsSearching(false);
    setCurrentPage(1);
  };
  
  const handleSongClick = (song: Song) => {
    setSelectedSong(song);
    
    // Update search results to highlight the selected song
    setSearchResults(searchResults.map(s => ({
      ...s,
      isHighlighted: s.id === song.id
    })));
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    const maxPages = Math.ceil(searchResults.length / resultsPerPage);
    if (currentPage < maxPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  // Get current page's results
  const paginatedResults = searchResults.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );
  
  const totalPages = Math.ceil(searchResults.length / resultsPerPage);

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
            <button 
              className="win98-button flex items-center"
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
            >
              <ChevronLeft size={14} className="mr-1" /> Previous
            </button>
            {searchResults.length > 0 && (
              <span className="mx-2">
                Page {currentPage} of {totalPages}
              </span>
            )}
            <button 
              className="win98-button flex items-center"
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
            >
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
        ) : paginatedResults.length > 0 ? (
          <table className="napster-list w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Artist</th>
                <th>Size</th>
                <th>Bitrate</th>
                <th>Length</th>
                <th>Ping</th>
              </tr>
            </thead>
            <tbody>
              {paginatedResults.map((result, index) => (
                <tr 
                  key={result.id || index}
                  className={result.isHighlighted ? 'highlighted' : ''}
                  onClick={() => handleSongClick(result)}
                >
                  <td>{result.title || result.filename}</td>
                  <td>{result.artist || 'Unknown Artist'}</td>
                  <td>{formatFileSize(result.filesize)}</td>
                  <td>{result.bitrate} kbps</td>
                  <td>{result.length}</td>
                  <td>{result.ping}</td>
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
      
      {selectedSong && <SpotifyPlayer song={selectedSong} />}
    </div>
  );
};

// Helper function to format file sizes
const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B';
  const kb = bytes / 1024;
  if (kb < 1024) return kb.toFixed(1) + ' KB';
  const mb = kb / 1024;
  return mb.toFixed(1) + ' MB';
};

export default SearchTab;
