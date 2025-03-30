
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { toast } from "@/utils/toast";
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-react';

const SearchTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [maxResults, setMaxResults] = useState(100);
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      toast.info(`Searching for "${searchQuery}" with max results: ${maxResults}`);
      // Simulate search delay
      setTimeout(() => setIsSearching(false), 1500);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setIsSearching(false);
    toast.info('Search cleared');
  };

  return (
    <div className="h-[340px] flex flex-col">
      <div className="bg-napsterGray p-2 border-b border-napsterDarkGray">
        <div className="flex items-center mb-2">
          <div className="w-24 mr-2">Search For:</div>
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-grow"
            placeholder="Enter search keywords"
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
              <div>Please wait while Napster searches for "{searchQuery}"</div>
            </div>
          </div>
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
