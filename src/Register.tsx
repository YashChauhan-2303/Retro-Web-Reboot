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
    e.preventDefault();
    setMessage("");
  
    // 🔹 Step 1: Sign up the user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } }, // ✅ Try storing name initially
    });
  
    if (error) {
      setMessage("Error: " + error.message);
      return;
    }
  
    if (data?.user) {
      const userId = data.user.id; // ✅ Get the Auth user ID
  
      // 🔹 Step 2: Ensure user_metadata is updated (Fix for missing name issue)
      await supabase.auth.updateUser({ data: { name } });
  
      // 🔹 Step 3: Insert user data into the "users" table (Ensures matching UUIDs)
      const { error: dbError } = await supabase.from("users").insert([
        {
          id: userId,  // ✅ Ensure Auth ID and users.id match
          name,
          email,
        },
      ]);
  
      if (dbError) {
        setMessage("Error saving user data: " + dbError.message);
        return;
      }
  
      // 🔹 Step 4: Auto-login after registration
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
  
    // Clear form fields
    setName("");
    setEmail("");
    setPassword("");
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 text-black p-6" style={{ fontFamily: "Courier New, monospace" }}>
      <h2 className="text-3xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <table className="w-full border-collapse border border-gray-600">
          <tbody>
            <tr className="border border-gray-600">
              <td className="p-2 border border-gray-600 bg-gray-300">Name:</td>
              <td className="p-2 border border-gray-600">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-1 border border-gray-600"
                />
              </td>
            </tr>
            <tr className="border border-gray-600">
              <td className="p-2 border border-gray-600 bg-gray-300">Email:</td>
              <td className="p-2 border border-gray-600">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-1 border border-gray-600"
                />
              </td>
            </tr>
            <tr className="border border-gray-600">
              <td className="p-2 border border-gray-600 bg-gray-300">Password:</td>
              <td className="p-2 border border-gray-600">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-1 border border-gray-600"
                />
              </td>
            </tr>
          </tbody>
        </table>
        {message && (
          <p className={`mt-4 text-center ${message.includes("Error") ? "text-red-600" : "text-green-600"}`}>
            {message}
          </p>
        )}
        <div className="mt-4">
          <button
            type="submit"
            className="w-full p-2 border border-gray-600 bg-gray-300 hover:bg-gray-400 transition"
          >
            Register
          </button>
        </div>
      </form>
      <p className="mt-4">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Login here
        </a>
      </p>
    </div>
  );
}
