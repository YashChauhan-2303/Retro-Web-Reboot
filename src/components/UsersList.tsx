
import React, { useState } from 'react';
import { usersList } from '../data/songs';
import { toast } from "@/utils/toast";

const UsersList: React.FC = () => {
  const [users] = useState(usersList);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const handleUserClick = (user: string) => {
    setSelectedUser(user);
    toast.info(`Selected user: ${user}`);
  };

  const handleAddComputer = () => {
    toast.info("Add Computer clicked");
  };

  const handleRemoveComputer = () => {
    toast.info("Remove Computer clicked");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="overflow-auto flex-grow win98-inset bg-white">
        <div className="p-1">
          <div className="font-bold">Online:</div>
          {users.map((user) => (
            <div 
              key={user}
              className={`py-1 px-2 cursor-pointer ${selectedUser === user ? 'bg-[#0A246A] text-white' : ''}`}
              onClick={() => handleUserClick(user)}
            >
              {user}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col mt-2 space-y-2">
        <button className="win98-button" onClick={handleAddComputer}>Add Computer</button>
        <button className="win98-button" onClick={handleRemoveComputer}>Remove Computer</button>
      </div>
    </div>
  );
};

export default UsersList;
