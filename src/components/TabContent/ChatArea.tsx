
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { toast } from "@/utils/toast";

const ChatArea = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { user: 'System', message: 'Welcome to Napster Chat!' },
    { user: 'System', message: 'Please be respectful to other users.' },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatMessages([...chatMessages, { user: 'You', message }]);
      setMessage('');
      toast.info('Message sent');
    }
  };

  return (
    <div className="flex h-[340px] gap-2">
      <div className="w-1/4 win98-inset bg-white overflow-auto">
        <div className="p-1">
          <div className="font-bold">Chat Rooms:</div>
          <div className="py-1 px-2 cursor-pointer bg-[#0A246A] text-white">
            Napster Lobby
          </div>
          <div className="py-1 px-2 cursor-pointer">
            MP3 Discussion
          </div>
          <div className="py-1 px-2 cursor-pointer">
            Napster Help
          </div>
        </div>
      </div>
      
      <div className="w-3/4 flex flex-col">
        <div className="flex-grow win98-inset bg-white overflow-auto">
          <div className="p-2">
            {chatMessages.map((chat, index) => (
              <div key={index} className="mb-1">
                <span className="font-bold">{chat.user}: </span>
                <span>{chat.message}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-2 flex">
          <Input 
            className="flex-grow mr-2" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
          />
          <button 
            className="win98-button"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
