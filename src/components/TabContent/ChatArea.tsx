
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";

interface ChatMessage {
  user: string;
  message: string;
}

const ChatArea = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { user: 'System', message: 'Welcome to Napster Chat!' },
    { user: 'System', message: 'Please be respectful to other users.' },
  ]);
  const [activeRoom, setActiveRoom] = useState('Napster Lobby');
  const [rooms, setRooms] = useState([
    'Napster Lobby',
    'MP3 Discussion',
    'Napster Help'
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatMessages([...chatMessages, { user: 'You', message }]);
      setMessage('');
      
      // Simulate response after 1 second
      setTimeout(() => {
        setChatMessages(prev => [
          ...prev, 
          { 
            user: 'NapsterUser' + Math.floor(Math.random() * 1000), 
            message: getRandomResponse() 
          }
        ]);
      }, 1000);
    }
  };

  const getRandomResponse = () => {
    const responses = [
      "Hey there! How's it going?",
      "Anyone have the new Metallica album?",
      "I'm looking for some rare Beatles tracks.",
      "This chat room is always so active!",
      "Has anyone tried the new Napster update?",
      "What's everyone listening to today?",
      "I just downloaded some amazing jazz tracks.",
      "Can someone help me with my connection?",
      "Is anyone else having trouble finding songs?",
      "What's your favorite music genre?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleRoomChange = (room: string) => {
    setActiveRoom(room);
    setChatMessages([
      { user: 'System', message: `Welcome to ${room}!` },
      { user: 'System', message: 'Please be respectful to other users.' },
    ]);
  };

  return (
    <div className="flex h-[calc(100vh-140px)] gap-2">
      <div className="w-1/4 win98-inset bg-white overflow-auto">
        <div className="p-1">
          <div className="font-bold">Chat Rooms:</div>
          {rooms.map(room => (
            <div 
              key={room}
              className={`py-1 px-2 cursor-pointer ${activeRoom === room ? 'bg-[#0A246A] text-white' : 'hover:bg-gray-200'}`}
              onClick={() => handleRoomChange(room)}
            >
              {room}
            </div>
          ))}
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
