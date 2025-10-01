import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Signup from './pages/Auth/Signup';
import CreateCircle from './pages/Circles/CreateCircle';
import Dashboard from './pages/Dashboard/Dashboard';

// A simple placeholder for the home page
function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-5xl font-bold text-gray-800">Welcome to CircleSafe</h1>
      <p className="mt-4 text-xl text-gray-600">Your personal safety network, re-imagined.</p>
      <Link to="/signup" className="px-8 py-3 mt-10 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700">
        Get Started
      </Link>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/create-circle" element={<CreateCircle />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;