import React, { useState } from 'react';
import MenuBar from './MenuBar';
import Advertisement from './Advertisement';
import TabBar from './TabBar';
import UsersList from './UsersList';
import SongsList from './SongsList';
import StatusBar from './StatusBar';
import { Song } from '../types/Song';
import ChatArea from './TabContent/ChatArea';
import SearchTab from './TabContent/SearchTab';
import HotList from './TabContent/HotList';
import TransferTab from './TabContent/TransferTab';
import FeedbackTab from './TabContent/FeedbackTab';

const NapsterApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Library');
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  
  const handleSpotifyAuth = () => {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID || '5671179244724cbc96654ba78a6da871';
    
    const authUrl = 'https://accounts.spotify.com/authorize' + 
      `?client_id=${clientId}` +
      '&response_type=code' +
      '&redirect_uri=http://localhost:5001/callback' +
      '&scope=user-read-private%20user-read-email%20user-read-playback-state';
    
    window.open(authUrl, 'spotify_auth_window', 'width=600,height=700,menubar=no,toolbar=no');
  };
  
  const handleGetSongs = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/spotify/playback');
      if (!response.ok) {
        throw new Error('Failed to fetch playback state');
      }
      const data = await response.json();
      console.log('Playback state retrieved:', data);
      alert('Playback state retrieved and saved to spotify_playback_state.json');
    } catch (error) {
      console.error('Error fetching playback state:', error);
      alert('Error fetching playback state. Check console for details.');
    }
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'Chat Area':
        return <ChatArea />;
      case 'Library':
        return (
          <div className="flex h-[calc(100vh-140px)] gap-2">
            <div className="w-1/4">
              <UsersList />
            </div>
            <div className="w-3/4">
              <SongsList />
            </div>
          </div>
        );
      case 'Search':
        return <SearchTab />;
      case 'Hot List':
        return <HotList />;
      case 'Transfer':
        return <TransferTab />;
      case 'Feedback':
        return <FeedbackTab />;
      default:
        return (
          <div className="flex h-[calc(100vh-140px)] gap-2">
            <div className="w-1/4">
              <UsersList />
            </div>
            <div className="w-3/4">
              <SongsList />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-screen bg-napsterGray overflow-hidden">
      <div className="w-full h-full">
        <div className="p-2 space-y-2 h-full flex flex-col">
          <MenuBar />
          
          <Advertisement />
          
          <div className="flex items-center">
            <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
            <button 
              onClick={handleSpotifyAuth}
              className="ml-2 px-3 py-1 text-sm font-medium bg-napsterGray border border-gray-600 hover:bg-gray-700 text-white"
            >
              Spotify
            </button>
            <button 
              onClick={handleGetSongs}
              className="ml-2 px-3 py-1 text-sm font-medium bg-napsterGray border border-gray-600 hover:bg-gray-700 text-white"
            >
              Get Songs
            </button>
          </div>
          
          {renderTabContent()}
          
          <StatusBar 
            sharedSongs={141} 
            totalMbShared={1778} 
            onlineSharers={145068} 
            gBytes={605} 
            sharers={864} 
          />
        </div>
      </div>
    </div>
  );
};

export default NapsterApp;
