document.addEventListener('DOMContentLoaded', () => {
  // Initialize Firebase
  const auth = firebase.auth();
  const db = firebase.firestore();
  const functions = firebase.functions();

  // DOM elements
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const loginButton = document.getElementById('login');
  const registerButton = document.getElementById('register');
  const logoutButton = document.getElementById('logout');
  const checkInButton = document.getElementById('check-in');
  const authContainer = document.getElementById('auth-container');
  const dashboardContainer = document.getElementById('dashboard-container');
  const teamStatusDiv = document.getElementById('team-status');

  // --- Authentication ---

  // Register new user
  registerButton.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        console.log('User registered:', userCredential.user);
        // Create a user document in Firestore
        return db.collection('users').doc(userCredential.user.uid).set({
          email: userCredential.user.email,
          lastCheckIn: null
        });
      })
      .catch(error => {
        console.error('Registration error:', error);
        alert(error.message);
      });
  });

  // Login user
  loginButton.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        console.log('User logged in:', userCredential.user);
      })
      .catch(error => {
        console.error('Login error:', error);
        alert(error.message);
      });
  });

  // Logout user
  logoutButton.addEventListener('click', () => {
    auth.signOut().then(() => {
      console.log('User logged out');
    });
  });

  // --- Dashboard ---

  let unsubscribe; // To hold the Firestore listener subscription

  // Call the checkIn Cloud Function
  checkInButton.addEventListener('click', () => {
    const checkInFunction = functions.httpsCallable('checkIn');
    checkInButton.disabled = true;
    checkInFunction()
      .then(result => {
        console.log('Check-in successful:', result);
        checkInButton.disabled = false;
      })
      .catch(error => {
        console.error('Error calling checkIn function:', error);
        alert('Error checking in. Please try again.');
        checkInButton.disabled = false;
      });
  });

  // Listen for real-time updates on team status
  function setupDashboardListener() {
    unsubscribe = db.collection('users')
      .onSnapshot(querySnapshot => {
        let html = '<ul>';
        querySnapshot.forEach(doc => {
          const userData = doc.data();
          const checkInTime = userData.lastCheckIn
            ? new Date(userData.lastCheckIn.seconds * 1000).toLocaleString()
            : 'Never';
          html += `<li><strong>${userData.email}:</strong> ${checkInTime}</li>`;
        });
        html += '</ul>';
        teamStatusDiv.innerHTML = html;
      }, error => {
        console.error("Error fetching team status: ", error);
      });
  }

  // Auth state listener
  auth.onAuthStateChanged(user => {
    if (user) {
      // User is signed in
      authContainer.style.display = 'none';
      dashboardContainer.style.display = 'block';
      setupDashboardListener(); // Start listening for dashboard updates
    } else {
      // User is signed out
      authContainer.style.display = 'block';
      dashboardContainer.style.display = 'none';
      if (unsubscribe) {
        unsubscribe(); // Stop listening to Firestore when logged out
      }
    }
  });
});