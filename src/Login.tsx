import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./helper/supabaseClient";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setError(signInError.message);
    } else {
      navigate("/home");
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#c0c0c0] text-black font-sans text-sm">
      <div className="border-2 border-[#808080] shadow-[inset_2px_2px_#dfdfdf] p-0 w-96">
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-[#000080] to-[#c0c0c0] text-white p-1 flex justify-between items-center">
          <span className="font-bold">Login</span>
        </div>

        <div className="p-4">
          <table className="w-full text-left">
            <tbody>
              <tr>
                <td className="p-2">Email:</td>
                <td>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-1 border border-inset border-gray-600 bg-white text-black"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-2">Password:</td>
                <td>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-1 border border-inset border-gray-600 bg-white text-black"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          {error && <p className="text-red-600 mt-2">{error}</p>}

          <button
            onClick={handleLogin}
            className="w-full mt-4 px-6 py-2 border-2 border-t-[#dfdfdf] border-l-[#dfdfdf] border-b-[#808080] border-r-[#808080] bg-[#c0c0c0] text-black active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#dfdfdf] active:border-r-[#dfdfdf]"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
