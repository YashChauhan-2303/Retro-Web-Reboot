
import React from 'react';

const TransferTab = () => {
  const downloads = [
    { filename: "Nirvana - Smells Like Teen Spirit.mp3", progress: 45, size: "3,845,120", user: "GrungeRocker", speed: "3.4 KB/s" },
    { filename: "Radiohead - Karma Police.mp3", progress: 78, size: "4,125,632", user: "AudioPhile", speed: "5.2 KB/s" },
    { filename: "Pearl Jam - Alive.mp3", progress: 12, size: "3,562,496", user: "RockFan", speed: "2.1 KB/s" }
  ];

  const uploads = [
    { filename: "Dave Matthews Band - Crash Into Me.mp3", progress: 65, size: "4,326,400", user: "JamBand", speed: "4.3 KB/s" },
    { filename: "U2 - One.mp3", progress: 23, size: "3,728,384", user: "MusicLover", speed: "1.8 KB/s" }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="text-xs font-bold mb-1">Downloads</div>
      <div className="win98-inset p-0.5 overflow-auto h-1/2 mb-2">
        <table className="w-full song-list">
          <thead>
            <tr className="bg-[#c0c0c0] text-left sticky top-0">
              <th className="py-0.5 px-2 border-r border-[#808080]">Filename</th>
              <th className="py-0.5 px-2 border-r border-[#808080] w-16">Progress</th>
              <th className="py-0.5 px-2 border-r border-[#808080] w-20">Size</th>
              <th className="py-0.5 px-2 border-r border-[#808080] w-24">User</th>
              <th className="py-0.5 px-2 w-20">Speed</th>
            </tr>
          </thead>
          <tbody>
            {downloads.map((item, index) => (
              <tr key={index} className="song-row">
                <td>{item.filename}</td>
                <td>{item.progress}%</td>
                <td>{item.size}</td>
                <td>{item.user}</td>
                <td>{item.speed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="text-xs font-bold mb-1">Uploads</div>
      <div className="win98-inset p-0.5 overflow-auto h-1/2">
        <table className="w-full song-list">
          <thead>
            <tr className="bg-[#c0c0c0] text-left sticky top-0">
              <th className="py-0.5 px-2 border-r border-[#808080]">Filename</th>
              <th className="py-0.5 px-2 border-r border-[#808080] w-16">Progress</th>
              <th className="py-0.5 px-2 border-r border-[#808080] w-20">Size</th>
              <th className="py-0.5 px-2 border-r border-[#808080] w-24">User</th>
              <th className="py-0.5 px-2 w-20">Speed</th>
            </tr>
          </thead>
          <tbody>
            {uploads.map((item, index) => (
              <tr key={index} className="song-row">
                <td>{item.filename}</td>
                <td>{item.progress}%</td>
                <td>{item.size}</td>
                <td>{item.user}</td>
                <td>{item.speed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransferTab;
