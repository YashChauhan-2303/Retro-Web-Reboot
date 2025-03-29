import { useState } from "react";
import supabase from "./helper/supabaseClient";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleRegister = async () => {
    setError(null);
    setSuccess(null);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      setSuccess("User registered successfully!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-900 text-white font-mono">
      <h1 className="text-4xl mb-4 font-bold">ByteTunes - Register</h1>
      <div className="p-6 border border-white bg-blue-800 shadow-lg w-96 text-center">
        <table className="w-full text-left text-yellow-300 text-lg">
          <tbody>
            <tr>
              <td className="p-2">Name:</td>
              <td>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-1 border border-yellow-300 bg-blue-700 text-yellow-300"
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
                  className="w-full p-1 border border-yellow-300 bg-blue-700 text-yellow-300"
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
                  className="w-full p-1 border border-yellow-300 bg-blue-700 text-yellow-300"
                />
              </td>
            </tr>
          </tbody>
        </table>
        {error && <p className="text-red-400 mt-2">{error}</p>}
        {success && <p className="text-green-400 mt-2">{success}</p>}
        <button
          onClick={handleRegister}
          className="w-full mt-4 px-6 py-2 border border-yellow-300 bg-blue-700 hover:bg-blue-600 text-yellow-300 transition"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Register;
