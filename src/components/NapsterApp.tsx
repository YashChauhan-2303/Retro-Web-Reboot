
import React, { useState } from 'react';
import MenuBar from './MenuBar';
import Advertisement from './Advertisement';
import TabBar from './TabBar';
import UsersList from './UsersList';
import SongsList from './SongsList';
import StatusBar from './StatusBar';
import { Song } from '../data/songs';
import { toast } from "@/utils/toast";
import ChatArea from './TabContent/ChatArea';
import SearchTab from './TabContent/SearchTab';
import HotList from './TabContent/HotList';
import TransferTab from './TabContent/TransferTab';
import FeedbackTab from './TabContent/FeedbackTab';

const NapsterApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Library');
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  const handleSongSelect = (song: Song) => {
    setSelectedSong(song);
    toast.info(`Selected: ${song.filename}`);
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
              <SongsList onSongSelect={handleSongSelect} />
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
              <SongsList onSongSelect={handleSongSelect} />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-screen bg-napsterGray">
      <div className="win98-window w-full h-full">
        <div className="p-2 space-y-2 h-full flex flex-col">
          <MenuBar />
          
          <Advertisement />
          
          <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
          
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
