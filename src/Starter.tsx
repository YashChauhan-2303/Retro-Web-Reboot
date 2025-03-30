import React from "react";
import { useNavigate } from "react-router-dom";

const Starter: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-100 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-blue-900 text-white px-4 py-2 border-b-4 border-blue-700">
        <h1 className="text-3xl font-bold">ByteTunes</h1>
      </header>

      {/* Main Content */}
      <main className="flex flex-col flex-grow items-center justify-center py-10">
        <h2 className="text-4xl font-bold text-blue-900 mb-6">
          Welcome to ByteTunes
        </h2>
        <p className="text-xl text-blue-800 mb-8">
          Relive the glory days of the 90s music scene!
        </p>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-blue-700 text-white border border-blue-600 hover:bg-blue-600 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-3 bg-blue-700 text-white border border-blue-600 hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white text-center p-4">
        <small>© 2025 ByteTunes. All rights reserved.</small>
      </footer>
    </div>
  );
};

export default Starter;
