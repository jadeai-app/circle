import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkuchH7qcwaJfs8QVxv_5OQB-11023hsg",
  authDomain: "studio-9097357919-2f4fc.firebaseapp.com",
  projectId: "studio-9097357919-2f4fc",
  storageBucket: "studio-9097357919-2f4fc.appspot.com",
  messagingSenderId: "1020139773469",
  appId: "1:1020139773469:web:396ee4fc0089dc630ff0f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get DOM elements
const registerEmailInput = document.getElementById('register-email');
const registerPasswordInput = document.getElementById('register-password');
const registerButton = document.getElementById('register-button');

const loginEmailInput = document.getElementById('login-email');
const loginPasswordInput = document.getElementById('login-password');
const loginButton = document.getElementById('login-button');

const logoutButton = document.getElementById('logout-button');
const messageElement = document.getElementById('message');
const authContainer = document.getElementById('auth-container');
const userDashboard = document.getElementById('user-dashboard');
const userEmailElement = document.getElementById('user-email');

// --- Event Listeners ---

// Register button
registerButton?.addEventListener('click', async () => {
    const email = registerEmailInput.value;
    const password = registerPasswordInput.value;

    if (!email || !password) {
        showMessage('Please enter both email and password.');
        return;
    }

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        showMessage('Registration successful! Please log in.', 'green');
    } catch (error) {
        showMessage(`Registration failed: ${error.message}`);
    }
});

// Login button
loginButton?.addEventListener('click', async () => {
    const email = loginEmailInput.value;
    const password = loginPasswordInput.value;

    if (!email || !password) {
        showMessage('Please enter both email and password.');
        return;
    }

    try {
        await signInWithEmailAndPassword(auth, email, password);
        // Auth state change will handle UI update
    } catch (error) {
        showMessage(`Login failed: ${error.message}`);
    }
});

// Logout button
logoutButton?.addEventListener('click', async () => {
    try {
        await signOut(auth);
        // Auth state change will handle UI update
    } catch (error) {
        showMessage(`Logout failed: ${error.message}`);
    }
});

// --- Auth State Change ---

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        if(authContainer) authContainer.style.display = 'none';
        if(userDashboard) userDashboard.style.display = 'block';
        if(userEmailElement) userEmailElement.textContent = user.email;
        showMessage(''); // Clear any previous messages
    } else {
        // User is signed out
        if(authContainer) authContainer.style.display = 'block';
        if(userDashboard) userDashboard.style.display = 'none';
        if(userEmailElement) userEmailElement.textContent = '';
    }
});


// --- Helper Functions ---

function showMessage(msg, color = 'red') {
    if (messageElement) {
        messageElement.textContent = msg;
        messageElement.style.color = color;
    }
}