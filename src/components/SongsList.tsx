import React from 'react';
import SpotifyPlayer from './SpotifyPlayer';

const SongsList: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="overflow-auto flex-grow win98-inset bg-white p-4">
        <h3 className="text-lg font-bold mb-4">Spotify Integration</h3>
        <p className="mb-4">
          This app is connected to Spotify. You can authenticate using the Spotify button 
          in the top bar, then click "Get Songs" to fetch your currently playing track.
        </p>
        <p>
          Your current Spotify playback information will appear below.
        </p>
      </div>
      
      {/* Display Spotify player */}
      <SpotifyPlayer />
    </div>
  );
};

export default SongsList;
