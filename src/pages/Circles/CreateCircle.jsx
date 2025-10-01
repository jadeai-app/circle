import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { db } from '../../lib/firebase';
import { addDoc, collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';

function CreateCircle() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [circleName, setCircleName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!user) {
      setError("You must be logged in to create a circle.");
      setLoading(false);
      return;
    }

    if (!circleName.trim()) {
      setError("Circle name cannot be empty.");
      setLoading(false);
      return;
    }

    try {
      const circleRef = await addDoc(collection(db, 'circles'), {
        name: circleName,
        creatorId: user.uid,
        createdAt: serverTimestamp(),
      });

      const memberRef = doc(db, 'circles', circleRef.id, 'members', user.uid);
      await setDoc(memberRef, {
        role: 'owner',
        joinedAt: serverTimestamp(),
        email: user.email,
      });

      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Create your first Circle</h2>
        <p className="text-sm text-center text-gray-600">
          A circle is a private group of people you trust. Give it a name to get started.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="circleName"
              className="block text-sm font-medium text-gray-700"
            >
              Circle Name
            </label>
            <input
              id="circleName"
              name="circleName"
              type="text"
              required
              value={circleName}
              onChange={(e) => setCircleName(e.target.value)}
              placeholder="e.g., Family, Close Friends"
              className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              disabled={loading}
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Circle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCircle;