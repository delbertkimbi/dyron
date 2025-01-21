

// Signup Form
document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Hide error messages from previous submissions
    document.querySelectorAll('.error').forEach(el => el.textContent = '');

    // Show the loading indicator
    document.getElementById('loading').style.display = 'block';

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const phone = document.getElementById('phone').value;
    const role = document.getElementById('role').value;

    let isValid = true;

    // Validation logic
    if (username.length < 3) {
        document.getElementById('usernameError').textContent = 'Username must be at least 3 characters long';
        isValid = false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        isValid = false;
    }

    if (password.length < 8) {
        document.getElementById('passwordError').textContent = 'Password must be at least 8 characters long';
        isValid = false;
    }

    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
        isValid = false;
    }

    if (phone.length < 9) {
        document.getElementById('phoneError').textContent = 'Please enter a valid phone number';
        isValid = false;
    }

    if (!role) {
        document.getElementById('roleError').textContent = 'Please select what you are looking to do';
        isValid = false;
    }
    const apiUrl = 'http://localhost:3000/api/users/signup'; 
    if (isValid) {
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: username,
                email,
                password,
                phone,
                role
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Signup response: ', data); 
                if (data.message === 'User registered successfully') {
                    alert('Signup successful!');
                    window.location.href = '../index.html'; 
                } else {
                    alert(data.message);
                }
            })
            .catch(error => console.error('Error:', error))
            .finally(() => {
                // Hide the loading indicator once the request is complete
                document.getElementById('loading').style.display = 'none';
            });
    } else {
        // Hide the loading indicator in case of validation failure
        document.getElementById('loading').style.display = 'none';
    }
});
