
import React, { ReactNode } from 'react';

interface RetroWindowProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const RetroWindow = ({ title, children, className = '' }: RetroWindowProps) => {
  return (
    <div className={`win98-window ${className}`}>
      <div className="win98-window-inner">
        <div className="win98-titlebar">
          <div className="flex items-center gap-1">
            <img src="/napster-icon.png" alt="Napster" className="w-4 h-4 mr-1" />
            {title}
          </div>
        </div>
        <div className="p-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default RetroWindow;
