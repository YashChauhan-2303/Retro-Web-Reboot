import React, { useEffect, useState } from 'react';

interface PlaybackTrack {
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string }[];
  };
}

interface PlaybackState {
  item?: PlaybackTrack;
  is_playing?: boolean;
  message?: string; // For "No active playback session found" message
}

const SpotifyPlayer: React.FC = () => {
  const [playbackState, setPlaybackState] = useState<PlaybackState | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlaybackState = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:5001/api/spotify/playback');
      const data = await response.json();
      
      setPlaybackState(data);
      console.log('Fetched playback state:', data);
    } catch (err) {
      console.error('Error fetching playback:', err);
      setError('Could not fetch playback information');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch playback state when component mounts
    fetchPlaybackState();
    
    // Set up polling to refresh playback state every 30 seconds
    const intervalId = setInterval(fetchPlaybackState, 30000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <div className="win98-window p-2 mt-4">Loading playback information...</div>;
  }

  if (error) {
    return <div className="win98-window p-2 mt-4 text-red-500">{error}</div>;
  }

  // No active playback session
  if (playbackState?.message) {
    return (
      <div className="win98-window p-2 mt-4">
        <div className="text-center p-4">
          {playbackState.message}. Start playing something on Spotify!
        </div>
      </div>
    );
  }

  // No data received yet
  if (!playbackState || !playbackState.item) {
    return (
      <div className="win98-window p-2 mt-4">
        <div className="text-center p-4">
          No playback information available
        </div>
      </div>
    );
  }

  const { item, is_playing } = playbackState;
  const albumImage = item.album.images[0]?.url;
  const artistNames = item.artists.map(artist => artist.name).join(', ');

  return (
    <div className="win98-window p-2 mt-4">
      <div className="flex items-center space-x-3">
        {albumImage && (
          <img src={albumImage} alt={item.album.name} className="w-16 h-16" />
        )}
        <div className="flex-grow">
          <div className="font-bold text-base">{item.name}</div>
          <div className="text-sm">{artistNames}</div>
          <div className="text-xs opacity-75">{item.album.name}</div>
        </div>
        <div className="ml-auto">
          <span className="px-2 py-1 bg-gray-200 rounded text-xs">
            {is_playing ? 'Playing' : 'Paused'}
          </span>
        </div>
      </div>
      <div className="mt-2 text-center">
        <button 
          onClick={fetchPlaybackState}
          className="win98-button text-xs"
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default SpotifyPlayer;