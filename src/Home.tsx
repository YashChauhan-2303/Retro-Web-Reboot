import React, { useEffect, useState } from "react";
import { fetchProfile, fetchData } from "./helper/apiClient";

export default function Home() {
  const [profile, setProfile] = useState<any>(null);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Fetch user profile
        const profileData = await fetchProfile();
        setProfile(profileData.profile);
        
        // Fetch other data
        const response = await fetchData();
        setData(response.data || []);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {profile?.name || "User"}!</h1>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Your Profile</h2>
        <div className="p-2 bg-gray-100 rounded">
          <p>Email: {profile?.email}</p>
          {/* Add other profile fields as needed */}
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-2">Your Data</h2>
        {data.length === 0 ? (
          <p>No data available</p>
        ) : (
          <ul className="list-disc pl-5">
            {data.map((item, index) => (
              <li key={index}>
                {/* Display your data items here */}
                {JSON.stringify(item)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}