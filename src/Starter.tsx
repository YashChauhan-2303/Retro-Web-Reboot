import React from "react";
import { Link } from "react-router-dom";

const Starter: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#c0c0c0] text-black font-sans text-sm">
      <div className="border-2 border-[#808080] shadow-[inset_2px_2px_#dfdfdf] p-0 w-96">
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-[#000080] to-[#c0c0c0] text-white p-1 flex justify-between items-center">
          <span className="font-bold">Welcome to ByteTunes</span>
        </div>

        <div className="p-4 flex flex-col gap-4">
          <div className="space-y-2">
            <h2 className="text-center font-bold text-[#000080]">Choose an option:</h2>
            
            <div className="flex flex-col gap-3 mt-4">
              <Link 
                to="/login"
                className="w-full px-6 py-2 border-2 border-t-[#dfdfdf] border-l-[#dfdfdf] 
                         border-b-[#808080] border-r-[#808080] bg-[#c0c0c0] text-black text-center
                         active:border-t-[#808080] active:border-l-[#808080] 
                         active:border-b-[#dfdfdf] active:border-r-[#dfdfdf]"
              >
                Login
              </Link>
              
              <Link
                to="/register"
                className="w-full px-6 py-2 border-2 border-t-[#dfdfdf] border-l-[#dfdfdf] 
                         border-b-[#808080] border-r-[#808080] bg-[#c0c0c0] text-black text-center
                         active:border-t-[#808080] active:border-l-[#808080] 
                         active:border-b-[#dfdfdf] active:border-r-[#dfdfdf]"
              >
                Register
              </Link>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="border-t-2 border-[#808080] p-1 text-xs">
          Status: Ready
        </div>
      </div>
    </div>
  );
};

export default Starter;