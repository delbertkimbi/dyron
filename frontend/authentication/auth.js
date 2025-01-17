
document.getElementById('signinForm').addEventListener('submit', function(e) {
    e.preventDefault();

    document.querySelectorAll('.error').forEach(el => el.textContent = '');

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    let isValid = true;

    // Email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        isValid = false;
    }

    // Password validation
    if (password.length < 8) {
        document.getElementById('passwordError').textContent = 'Password must be at least 8 characters long';
        isValid = false;
    }

    if (isValid) {
        //Simulate form submission
        // alert('Sign in successful! Redirecting to dashboard...');
        window.location.href = '../index.html';
    }
});




//Signup logic
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset error messages
    document.querySelectorAll('.error').forEach(el => el.textContent = '');

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    let isValid = true;

    // Username validation
    if (username.length < 3) {
        document.getElementById('usernameError').textContent = 'Username must be at least 3 characters long';
        isValid = false;
    }

    // Email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        isValid = false;
    }

    // Password validation
    if (password.length < 8) {
        document.getElementById('passwordError').textContent = 'Password must be at least 8 characters long';
        isValid = false;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
        isValid = false;
    }

    if (isValid) {
        // Simulate form submission
        //alert('Sign up successful! Redirecting to login page...');
        window.location.href = '../index.html';
    }
});



document.getElementById('forgotPasswordForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset error messages
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
    document.getElementById('successMessage').textContent = '';

    const email = document.getElementById('email').value;

    let isValid = true;

    // Email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        isValid = false;
    }

    if (isValid) {
        // Simulate password reset request
        document.getElementById('successMessage').textContent = 'Password reset instructions have been sent to your email.';
        document.getElementById('email').value = '';
    }
});