
import React from 'react';

interface StatusBarProps {
  sharedSongs: number;
  totalMbShared: number;
  onlineSharers: number;
  gBytes: number;
  sharers: number;
}

const StatusBar: React.FC<StatusBarProps> = ({ 
  sharedSongs, 
  totalMbShared, 
  onlineSharers, 
  gBytes, 
  sharers 
}) => {
  return (
    <div className="flex bg-napsterGray p-1 border-t border-napsterDarkGray text-xs">
      <div className="flex-1">
        Online (hostname): Sharing {sharedSongs} Songs
      </div>
      <div className="flex-1 text-center">
        Currently {onlineSharers} users ({gBytes} gigabytes available in {sharers} shares)
      </div>
      <div className="flex-1 text-right">
        Total Mb Shared: {totalMbShared}
      </div>
    </div>
  );
};

export default StatusBar;
