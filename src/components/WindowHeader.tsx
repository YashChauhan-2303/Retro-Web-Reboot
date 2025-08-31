
import React from 'react';

interface WindowHeaderProps {
  title: string;
}

const WindowHeader: React.FC<WindowHeaderProps> = ({ title }) => {
  return (
    <div className="win98-header">
      <div className="flex items-center">
        <img 
          src="/lovable-uploads/2b4101b3-6676-4749-abf6-503504aad5f4.png" 
          alt="Napster Logo" 
          className="w-4 h-4 mr-2" 
        />
        <span>{title}</span>
      </div>
      <div className="win98-window-controls">
        <button className="win98-window-button">_</button>
        <button className="win98-window-button">□</button>
        <button className="win98-window-button">✕</button>
      </div>
    </div>
  );
};

export default WindowHeader;
