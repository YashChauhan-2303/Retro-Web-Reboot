
import React, { useState } from 'react';
import { toast } from "@/utils/toast";

interface Transfer {
  id: number;
  filename: string;
  user: string;
  size: string;
  status: 'Downloading' | 'Queued' | 'Complete' | 'Failed';
  progress: number;
}

const TransferTab = () => {
  const [transfers, setTransfers] = useState<Transfer[]>([
    { id: 1, filename: "metallica_-_enter_sandman.mp3", user: "metallica_fan99", size: "5.7 MB", status: 'Downloading', progress: 45 },
    { id: 2, filename: "nirvana_-_smells_like_teen_spirit.mp3", user: "grunge4life", size: "4.2 MB", status: 'Queued', progress: 0 },
    { id: 3, filename: "linkin_park_-_in_the_end.mp3", user: "hybrid_theory", size: "3.8 MB", status: 'Complete', progress: 100 }
  ]);
  
  const [selectedTransfer, setSelectedTransfer] = useState<number | null>(null);
  
  const handleTransferClick = (id: number) => {
    setSelectedTransfer(id);
    const transfer = transfers.find(t => t.id === id);
    if (transfer) {
      toast.info(`Selected transfer: ${transfer.filename}`);
    }
  };
  
  const handleCancelTransfer = () => {
    if (selectedTransfer) {
      const transfer = transfers.find(t => t.id === selectedTransfer);
      if (transfer && transfer.status !== 'Complete') {
        toast.info(`Cancelled transfer: ${transfer.filename}`);
        setTransfers(transfers.map(t => 
          t.id === selectedTransfer ? {...t, status: 'Failed'} : t
        ));
      } else {
        toast.error("Cannot cancel completed transfers");
      }
    } else {
      toast.error("No transfer selected");
    }
  };
  
  const handleClearCompleted = () => {
    const completedTransfers = transfers.filter(t => t.status === 'Complete');
    if (completedTransfers.length > 0) {
      setTransfers(transfers.filter(t => t.status !== 'Complete'));
      toast.success(`Cleared ${completedTransfers.length} completed transfers`);
    } else {
      toast.info("No completed transfers to clear");
    }
  };

  return (
    <div className="h-[340px] flex flex-col">
      <div className="flex-grow win98-inset bg-white overflow-auto">
        <table className="napster-list w-full text-sm">
          <thead>
            <tr>
              <th>Filename</th>
              <th>User</th>
              <th>Size</th>
              <th>Status</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {transfers.map((transfer) => (
              <tr 
                key={transfer.id}
                className={selectedTransfer === transfer.id ? "highlighted" : ""}
                onClick={() => handleTransferClick(transfer.id)}
              >
                <td>{transfer.filename}</td>
                <td>{transfer.user}</td>
                <td>{transfer.size}</td>
                <td>{transfer.status}</td>
                <td>
                  <div className="w-full bg-gray-200 h-2">
                    <div 
                      className="bg-napsterBlue h-2" 
                      style={{ width: `${transfer.progress}%` }}
                    ></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-2 flex justify-between">
        <button 
          className="win98-button"
          onClick={handleCancelTransfer}
        >
          Cancel Transfer
        </button>
        <button 
          className="win98-button"
          onClick={handleClearCompleted}
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
};

export default TransferTab;
