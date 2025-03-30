
import React, { useState } from 'react';
import { toast } from "@/components/ui/sonner";

const MenuBar: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleMenuClick = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
    
    toast.info(`${menu} menu clicked`);
  };

  return (
    <div className="napster-menu-bar">
      <div 
        className="napster-menu-item"
        onClick={() => handleMenuClick('File')}
      >
        File
      </div>
      <div 
        className="napster-menu-item"
        onClick={() => handleMenuClick('Settings')}
      >
        Settings
      </div>
      <div 
        className="napster-menu-item"
        onClick={() => handleMenuClick('Help')}
      >
        Help
      </div>
    </div>
  );
};

export default MenuBar;
