
import React from 'react';
import { toast } from "@/utils/toast";

const Advertisement: React.FC = () => {
  const handleInquireClick = () => {
    toast.info("Inquiry submitted!");
  };

  return (
    <div className="napster-advertisement">
      <div className="text-xl font-bold">Want Your Ad Here?</div>
      <button 
        className="win98-button text-red-600 font-bold"
        onClick={handleInquireClick}
      >
        Inquire Within
      </button>
    </div>
  );
};

export default Advertisement;
