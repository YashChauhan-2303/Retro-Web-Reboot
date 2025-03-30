
import React, { useState } from 'react';

const MenuBar: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleMenuClick = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <div className="napster-menu-bar">
      <div 
        className={`napster-menu-item ${activeMenu === 'File' ? 'active' : ''}`}
        onClick={() => handleMenuClick('File')}
      >
        File
        {activeMenu === 'File' && (
          <div className="napster-dropdown">
            <div className="napster-dropdown-item">New Library</div>
            <div className="napster-dropdown-item">Open Library</div>
            <div className="napster-dropdown-divider"></div>
            <div className="napster-dropdown-item">Connect</div>
            <div className="napster-dropdown-item">Disconnect</div>
            <div className="napster-dropdown-divider"></div>
            <div className="napster-dropdown-item">Exit</div>
          </div>
        )}
      </div>
      <div 
        className={`napster-menu-item ${activeMenu === 'Settings' ? 'active' : ''}`}
        onClick={() => handleMenuClick('Settings')}
      >
        Settings
        {activeMenu === 'Settings' && (
          <div className="napster-dropdown">
            <div className="napster-dropdown-item">Connection...</div>
            <div className="napster-dropdown-item">Downloads...</div>
            <div className="napster-dropdown-item">Uploads...</div>
            <div className="napster-dropdown-item">Chat...</div>
            <div className="napster-dropdown-divider"></div>
            <div className="napster-dropdown-item">Options...</div>
          </div>
        )}
      </div>
      <div 
        className={`napster-menu-item ${activeMenu === 'Help' ? 'active' : ''}`}
        onClick={() => handleMenuClick('Help')}
      >
        Help
        {activeMenu === 'Help' && (
          <div className="napster-dropdown">
            <div className="napster-dropdown-item">Napster Help...</div>
            <div className="napster-dropdown-item">Napster FAQ...</div>
            <div className="napster-dropdown-divider"></div>
            <div className="napster-dropdown-item">About Napster...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuBar;
