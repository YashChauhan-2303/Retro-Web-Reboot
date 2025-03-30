import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./helper/supabaseClient";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    // Keep all existing functionality unchanged
    e.preventDefault();
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });

    if (error) {
      setMessage("Error: " + error.message);
      return;
    }

    if (data?.user) {
      const userId = data.user.id;

      const { error: dbError } = await supabase.from("users").insert([
        {
          id: userId,
          name,
          email,
        },
      ]);

      if (dbError) {
        setMessage("Error saving user data: " + dbError.message);
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        setMessage("Error: " + signInError.message);
        return;
      }

      navigate("/home");
    }

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#c0c0c0] text-black font-sans text-sm">
      <div className="border-2 border-[#808080] shadow-[inset_2px_2px_#dfdfdf] p-0 w-96">
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-[#000080] to-[#c0c0c0] text-white p-1 flex justify-between items-center">
          <span className="font-bold">Register</span>
        </div>

        <div className="p-4">
          <table className="w-full text-left">
            <tbody>
              <tr>
                <td className="p-2">Name:</td>
                <td>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-1 border border-inset border-gray-600 bg-white text-black"
                  />
                </td>
              </tr>
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

          {message && <p className="text-red-600 mt-2">{message}</p>}

          <button
            onClick={handleSubmit}
            className="w-full mt-4 px-6 py-2 border-2 border-t-[#dfdfdf] border-l-[#dfdfdf] border-b-[#808080] border-r-[#808080] bg-[#c0c0c0] text-black active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#dfdfdf] active:border-r-[#dfdfdf]"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}