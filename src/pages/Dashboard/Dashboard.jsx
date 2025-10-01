import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 text-center bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold">Welcome to your Dashboard</h2>
        {user ? (
          <div>
            <p className="text-gray-600">You are logged in as {user.email}.</p>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 mt-6 font-semibold text-white bg-red-500 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-gray-600">You are not logged in.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;