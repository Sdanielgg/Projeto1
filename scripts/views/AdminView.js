document.addEventListener('DOMContentLoaded', () => {
    const adminUser = new User("Admin", 0, "", "", "", "admin", "123", "inactive", "admin");

    let adminUsers = JSON.parse(localStorage.getItem('adminUsers')) || [];

    if (!adminUsers.find(user => user.username === adminUser.username)) {
        adminUsers.push(adminUser);
    }

    localStorage.setItem('adminUsers', JSON.stringify(adminUsers));

    function displayAlert(message, alertType) {
        const alertContainer = document.getElementById('alertContainer');
        const alertElement = document.createElement('div');
        alertElement.classList.add('alert', `alert-${alertType}`, 'alert-dismissible', 'fade', 'show');
        alertElement.innerHTML = `
            <strong>${message}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        alertContainer.appendChild(alertElement);
    }

    function loginUser() {
        const username = document.querySelector('#usernameInput').value;
        const password = document.querySelector('#passwordInput').value;

        let adminUsers = JSON.parse(localStorage.getItem('adminUsers')) || [];

        const adminUser = adminUsers.find(user => user.username === username && user.password === password);

        if (adminUser) {
            displayAlert('Login successful!', 'success');
            window.location.href = './admin_page.html';
        } else {
            displayAlert('Invalid username or password', 'danger');
        }
    }

    function logoutUser() {
        sessionStorage.clear();
        window.location.href = '../index.html';
    }

    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');

    if (loginButton) {
        loginButton.addEventListener('click', loginUser);
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', logoutUser);
    }
});

