
import React, { useState } from 'react';
import { toast } from "@/utils/toast";

interface HotListItem {
  id: number;
  name: string;
  artist: string;
  genre: string;
  downloads: number;
}

const HotList = () => {
  const [hotItems] = useState<HotListItem[]>([
    { id: 1, name: "Californication", artist: "Red Hot Chili Peppers", genre: "Alternative", downloads: 9827 },
    { id: 2, name: "Numb", artist: "Linkin Park", genre: "Rock", downloads: 8745 },
    { id: 3, name: "In The End", artist: "Linkin Park", genre: "Rock", downloads: 7632 },
    { id: 4, name: "Smells Like Teen Spirit", artist: "Nirvana", genre: "Grunge", downloads: 6543 },
    { id: 5, name: "Enter Sandman", artist: "Metallica", genre: "Metal", downloads: 5421 }
  ]);
  
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  
  const handleItemClick = (id: number) => {
    setSelectedItem(id);
    const item = hotItems.find(item => item.id === id);
    if (item) {
      toast.info(`Selected: ${item.name} by ${item.artist}`);
    }
  };
  
  const handleDownload = () => {
    if (selectedItem) {
      const item = hotItems.find(item => item.id === selectedItem);
      if (item) {
        toast.success(`Started download for: ${item.name}`);
      }
    } else {
      toast.error("No song selected");
    }
  };

  return (
    <div className="h-[340px] flex flex-col">
      <div className="flex-grow win98-inset bg-white overflow-auto">
        <table className="napster-list w-full text-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Song Name</th>
              <th>Artist</th>
              <th>Genre</th>
              <th>Downloads</th>
            </tr>
          </thead>
          <tbody>
            {hotItems.map((item) => (
              <tr 
                key={item.id}
                className={selectedItem === item.id ? "highlighted" : ""}
                onClick={() => handleItemClick(item.id)}
              >
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.artist}</td>
                <td>{item.genre}</td>
                <td>{item.downloads}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-2 flex justify-between">
        <button 
          className="win98-button"
          onClick={handleDownload}
        >
          Download Selected Song
        </button>
        <button 
          className="win98-button"
          onClick={() => toast.info("Refreshing Hot List...")}
        >
          Refresh Hot List
        </button>
      </div>
    </div>
  );
};

export default HotList;
