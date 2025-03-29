
import React from 'react';
import { MessageSquare, Library, Search, HelpCircle, MessageCircle, ArrowDownUp } from 'lucide-react';

interface TabNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabNav = ({ activeTab, setActiveTab }: TabNavProps) => {
  const tabs = [
    { id: 'chat', label: 'Chat Area', icon: <MessageSquare size={16} /> },
    { id: 'library', label: 'Library', icon: <Library size={16} /> },
    { id: 'search', label: 'Search', icon: <Search size={16} /> },
    { id: 'hotlist', label: 'Hot List', icon: <HelpCircle size={16} /> },
    { id: 'transfer', label: 'Transfer', icon: <ArrowDownUp size={16} /> },
    { id: 'feedback', label: 'Feedback', icon: <MessageCircle size={16} /> },
  ];

  return (
    <div className="napster-tab-bar border-b border-[#808080]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab-button flex items-center gap-1 ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default TabNav;
