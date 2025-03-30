
import React from 'react';
import { toast } from "@/utils/toast";
import { Search, List, MessageSquare, ArrowRightFromLine, MessageCircle } from 'lucide-react';

interface TabBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, setActiveTab }) => {
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    toast.info(`Switched to ${tab} tab`);
  };

  return (
    <div className="flex space-x-1 bg-napsterGray p-1">
      <button 
        className={`win98-tab ${activeTab === 'Chat Area' ? 'active' : ''}`}
        onClick={() => handleTabClick('Chat Area')}
      >
        <MessageSquare size={16} className="mr-1" /> Chat Area
      </button>
      <button 
        className={`win98-tab ${activeTab === 'Library' ? 'active' : ''}`}
        onClick={() => handleTabClick('Library')}
      >
        <List size={16} className="mr-1" /> Library
      </button>
      <button 
        className={`win98-tab ${activeTab === 'Search' ? 'active' : ''}`}
        onClick={() => handleTabClick('Search')}
      >
        <Search size={16} className="mr-1" /> Search
      </button>
      <button 
        className={`win98-tab ${activeTab === 'Hot List' ? 'active' : ''}`}
        onClick={() => handleTabClick('Hot List')}
      >
        <MessageCircle size={16} className="mr-1" /> Hot List
      </button>
      <button 
        className={`win98-tab ${activeTab === 'Transfer' ? 'active' : ''}`}
        onClick={() => handleTabClick('Transfer')}
      >
        <ArrowRightFromLine size={16} className="mr-1" /> Transfer
      </button>
      <button 
        className={`win98-tab ${activeTab === 'Feedback' ? 'active' : ''}`}
        onClick={() => handleTabClick('Feedback')}
      >
        <MessageCircle size={16} className="mr-1" /> Feedback
      </button>
    </div>
  );
};

export default TabBar;
