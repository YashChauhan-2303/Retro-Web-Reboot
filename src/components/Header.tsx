
import React, { useState } from 'react';
import { File, Settings, HelpCircle } from 'lucide-react';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from '@/components/ui/menubar';

const Header = () => {
  return (
    <div className="w-full bg-primary">
      <div className="flex px-1 text-white">
        <div className="flex items-center gap-1 mr-auto">
          <img src="/napster-icon.png" alt="Napster" className="w-4 h-4 mr-1" />
          <span className="text-sm font-bold">napster v2.0 BETA 3 © 1999 napster Inc.</span>
        </div>
        <div className="flex">
          <button className="h-4 w-4 flex items-center justify-center border border-white text-white text-xs leading-none mx-0.5">_</button>
          <button className="h-4 w-4 flex items-center justify-center border border-white text-white text-xs leading-none mx-0.5">□</button>
          <button className="h-4 w-4 flex items-center justify-center border border-white text-white text-xs leading-none mx-0.5">×</button>
        </div>
      </div>
      <div className="napster-menubar px-1 text-xs">
        <div className="top-menu-item">File</div>
        <div className="top-menu-item">Settings</div>
        <div className="top-menu-item">Help</div>
      </div>
    </div>
  );
};

export default Header;
