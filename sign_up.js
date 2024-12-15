// Get the form and message elements
const signupForm = document.getElementById('signup-form');
const message = document.getElementById('message');

// Add an event listener to the form submit
signupForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Check if passwords match
    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match!";
        return;
    }

    // Simple form validation (checking if fields are not empty)
    if (username && email && password && confirmPassword) {
        message.textContent = "Sign up successful!";
        message.style.color = "green";
        
    } else {
        message.textContent = "All fields are required!";
        message.style.color = "red";
    }
});
