
import React from 'react';

interface StatusBarProps {
  connectedUsers: number;
  filesAvailable: number;
}

const StatusBar = ({ connectedUsers, filesAvailable }: StatusBarProps) => {
  return (
    <div className="win98-inset p-1 text-xs">
      <div className="flex justify-between">
        <div>Online (FireWall): Sharing 141 Songs</div>
        <div>Currently 155,068 users (605 gigabytes) available in 364 libraries</div>
      </div>
    </div>
  );
};

export default StatusBar;
