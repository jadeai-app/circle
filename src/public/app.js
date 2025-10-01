/*
 * CircleGuard Landing Page Scripts
 * Author: Jules
 */

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('.signup-form');

    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent the default form submission

            const emailInput = signupForm.querySelector('input[type="email"]');
            const email = emailInput.value;

            if (email) {
                // Placeholder action: Show an alert
                alert(`Thank you for your interest! We'll notify you at ${email} when we launch.`);
                emailInput.value = ''; // Clear the input field
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // You can add more interactivity here later, for example:
    // - Smooth scrolling for navigation links
    // - A "Read More" toggle for FAQ items
    // - Animations on scroll
});