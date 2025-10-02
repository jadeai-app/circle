import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User
} from 'firebase/auth';

// Read Firebase config from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage('Registration successful! Please log in.');
    } catch (error: any) {
      setMessage(`Registration failed: ${error.message}`);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('');
    } catch (error: any) {
      setMessage(`Login failed: ${error.message}`);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      setMessage(`Logout failed: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <h1>Welcome</h1>
      {user ? (
        <div id="user-dashboard">
          <h2>Dashboard</h2>
          <p>Welcome, {user.email}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div id="auth-container">
          <div id="register-form">
            <h2>Register / Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button onClick={handleRegister}>Register</button>
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      )}
      {message && <p id="message" style={{ color: 'red' }}>{message}</p>}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);