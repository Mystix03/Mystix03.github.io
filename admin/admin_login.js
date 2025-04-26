function authenticateAdminLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Fetch the JSON file containing admin credentials
    fetch('admins.json')  // Replace with the correct path to your JSON file
        .then(response => response.json())
        .then(admins => {
            // Check if the username and password match any admin in the JSON
            const admin = admins.find(admin => admin.username === username && admin.password === password);

            if (admin) {
                localStorage.setItem('username', username);
                window.location.href = 'admin_dashboard.html'; // Redirect to Admin Dashboard
            } else {
                alert('Invalid username or password');
            }
        })
        .catch(error => {
            console.error('Error loading admin JSON:', error);
            alert('An error occurred while processing the login.');
        });

    return false;  // Prevent form submission
}
