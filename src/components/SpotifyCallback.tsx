
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SpotifyCallback = () => {
  const [status, setStatus] = useState('Processing authorization...');
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the authorization code from URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        
        if (!code) {
          setStatus('Authorization failed: No code received');
          setTimeout(() => navigate('/'), 3000);
          return;
        }

        // Process the code (in a real app, send this to your backend)
        console.log('Authorization code received:', code);
        setStatus('Authorization successful! Redirecting...');
        
        // Redirect back to main page after a delay
        setTimeout(() => navigate('/'), 2000);
      } catch (error) {
        console.error('Error processing callback:', error);
        setStatus('Authorization failed');
        setTimeout(() => navigate('/'), 3000);
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-napsterGray">
      <div className="win98-window p-4 max-w-md">
        <div className="win98-window-title mb-4">Spotify Authorization</div>
        <div className="text-center p-4">{status}</div>
      </div>
    </div>
  );
};

export default SpotifyCallback;
