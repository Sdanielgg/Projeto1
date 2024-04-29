// Function to show Bootstrap alert
function showAlert(message, alertType) {
    const alertContainer = document.getElementById('alertContainer');
    const alertElement = document.createElement('div');
    alertElement.classList.add('alert', `alert-${alertType}`, 'alert-dismissible', 'fade', 'show', 'position-fixed', 'top-0', 'start-50', 'translate-middle-x');
    alertElement.style.width = 'fit-content';
    alertElement.innerHTML = `
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        ${message}
    `;
    alertContainer.appendChild(alertElement);

    // Hide the alert after 5 seconds
    setTimeout(function() {
        alertElement.remove();
    }, 5000);
}

// Function to validate login
function validateLogin(username, password) {
    // Retrieve admin user from localStorage
    let storedUser = JSON.parse(localStorage.getItem('adminUser'));

    // Check if stored user exists
    if (!storedUser) {
        showAlert('Admin user not found!', 'danger');
        return false;
    }

    // Check if username and password match stored user
    if (username === storedUser.username && password === storedUser.password) {
        // Check if user is active
        if (storedUser.status === 'active') {
            showAlert('Login successful!', 'success');
        } else {
            // Update user status to active
            storedUser.status = 'active';
            localStorage.setItem('adminUser', JSON.stringify(storedUser));
            showAlert('Admin user status updated to active. Login successful!', 'success');
        }
    } else {
        showAlert('Invalid username or password!', 'danger');
    }
}

// Event listener for login button click
document.getElementById('loginButton').addEventListener('click', function() {
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;
    validateLogin(username, password);
});