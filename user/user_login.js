document.getElementById('loginForm').addEventListener('submit', authenticateUserLogin);

function authenticateUserLogin(event) {
    event.preventDefault();  // Prevent form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Fetch the JSON file containing user credentials
    fetch('../jsonfiles/users.json')  // Replace with the correct path to your JSON file
        .then(response => response.json())
        .then(users => {
            // Check if the username and password match any user in the JSON
            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                if (user.status === 'removed') {
                    alert('Your account has been removed by the admin. You cannot log in.');
                } else {
                    localStorage.setItem('username', username); // Store the logged-in username
                    window.location.href = 'user_dashboard.html'; // Redirect to User Dashboard
                }
            } else {
                alert('Invalid username or password');
            }
        })
        .catch(error => {
            console.error('Error loading user JSON:', error);
            alert('An error occurred while processing the login.');
        });
}
