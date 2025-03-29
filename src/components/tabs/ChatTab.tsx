
import React, { useState } from 'react';

const ChatTab = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { user: 'System', text: 'Welcome to Napster Chat!' },
    { user: 'NapsterUser1', text: 'Hey everyone, check out the new Metallica album!' },
    { user: 'MusicFan99', text: 'Anyone have Blink 182 songs?' }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setChatMessages([...chatMessages, { user: 'You', text: message }]);
      setMessage('');
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex">
        <div className="w-24 win98-inset p-0.5 overflow-auto">
          <div className="text-xs">
            {['Online', 'NapsterUser1', 'MusicFan99', 'CDCollector', 'DJMixer', 'MP3Lover', 'RockFan', 'Metallica', 'TuneGuru', 'BassHead', 'AudioPhile', 'VinylLover', 'JazzCat', 'Thelonius', 'WJB'].map((user, i) => (
              <div key={i} className={`py-0.5 px-1 ${i === 0 ? 'font-bold' : ''}`}>{user}</div>
            ))}
          </div>
        </div>
        <div className="flex-1 win98-inset p-0.5 ml-1 overflow-auto">
          <div className="text-xs">
            {chatMessages.map((msg, i) => (
              <div key={i} className="py-0.5">
                <span className="font-bold">{msg.user}:</span> {msg.text}
              </div>
            ))}
          </div>
        </div>
      </div>
      <form onSubmit={handleSendMessage} className="mt-2 flex">
        <input 
          type="text" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border border-[#808080] bg-white px-1 py-0.5 text-xs"
          placeholder="Type your message..."
        />
        <button type="submit" className="win98-button ml-1">Send</button>
      </form>
    </div>
  );
};

export default ChatTab;
