/*
 * CircleGuard Landing Page Scripts
 * Author: Jules
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Signup Form Redirect ---
    const signupForm = document.querySelector('.signup-form');

    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent the default form submission

            const emailInput = signupForm.querySelector('input[type="email"]');
            const email = emailInput.value;

            if (email) {
                // Redirect to the signup page with the email as a query parameter
                window.location.href = `signup.html?email=${encodeURIComponent(email)}`;
            } else {
                // Otherwise, just redirect to the signup page
                window.location.href = 'signup.html';
            }
        });
    }

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});