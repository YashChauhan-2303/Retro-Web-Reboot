
import React, { useState } from 'react';
import Header from '../components/Header';
import Advertisement from '../components/Advertisement';
import TabNav from '../components/TabNav';
import SongList, { Song } from '../components/SongList';
import Player from '../components/Player';
import StatusBar from '../components/StatusBar';
import { mockSongs } from '../data/mockSongs';
import SearchTab from '../components/tabs/SearchTab';
import LibraryTab from '../components/tabs/LibraryTab';
import ChatTab from '../components/tabs/ChatTab';
import HotListTab from '../components/tabs/HotListTab';
import TransferTab from '../components/tabs/TransferTab';
import FeedbackTab from '../components/tabs/FeedbackTab';

// Enhanced mock songs with connection and ping data
const enhancedMockSongs = mockSongs.map(song => ({
  ...song,
  connection: ['Cable', 'DSL', '56K', 'Unknown'][Math.floor(Math.random() * 4)],
  ping: Math.floor(Math.random() * 200 + 20).toString()
}));

const Index = () => {
  const [songs, setSongs] = useState<Song[]>(enhancedMockSongs);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('search');
  const [connectedUsers, setConnectedUsers] = useState(155068);
  const [filesAvailable, setFilesAvailable] = useState(605);

  const handleSongSelect = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    if (currentSong) {
      setIsPlaying(!isPlaying);
    }
  };

  const handlePrev = () => {
    if (!currentSong) return;
    
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIndex]);
    setIsPlaying(true);
  };

  const handleNext = () => {
    if (!currentSong) return;
    
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
    setIsPlaying(true);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatTab />;
      case 'library':
        return <LibraryTab songs={songs} onSongSelect={handleSongSelect} />;
      case 'search':
        return <SearchTab songs={songs} onSongSelect={handleSongSelect} />;
      case 'hotlist':
        return <HotListTab songs={songs} onSongSelect={handleSongSelect} />;
      case 'transfer':
        return <TransferTab />;
      case 'feedback':
        return <FeedbackTab />;
      default:
        return <SearchTab songs={songs} onSongSelect={handleSongSelect} />;
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1 p-1 flex flex-col overflow-hidden">
        <Advertisement />
        <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 overflow-hidden py-1">
          {renderTabContent()}
        </div>
        <Player 
          currentSong={currentSong}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          onPrev={handlePrev}
          onNext={handleNext}
        />
        <StatusBar connectedUsers={connectedUsers} filesAvailable={filesAvailable} />
      </div>
    </div>
  );
};

export default Index;
