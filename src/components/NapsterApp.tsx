
import React, { useState } from 'react';
import WindowHeader from './WindowHeader';
import MenuBar from './MenuBar';
import Advertisement from './Advertisement';
import TabBar from './TabBar';
import UsersList from './UsersList';
import SongsList from './SongsList';
import StatusBar from './StatusBar';
import { Song } from '../data/songs';
import { toast } from "@/utils/toast";

const NapsterApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Library');
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  const handleSongSelect = (song: Song) => {
    setSelectedSong(song);
    toast.info(`Selected: ${song.filename}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-4">
      <div className="win98-window">
        <WindowHeader title="napster v2.0 BETA © 1999 napster Inc." />
        
        <div className="p-2 space-y-2">
          <MenuBar />
          
          <Advertisement />
          
          <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className="flex h-[340px] gap-2">
            <div className="w-1/4">
              <UsersList />
            </div>
            
            <div className="w-3/4">
              <SongsList onSongSelect={handleSongSelect} />
            </div>
          </div>
          
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
