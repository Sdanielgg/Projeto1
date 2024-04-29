// Retrieve user data from localStorage
const usersData = JSON.parse(localStorage.getItem('users'));

// Function to update the localStorage with modified user data
function updateLocalStorage(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Function to display users in a table
function displayUsers() {
    const userList = document.getElementById('userList');

    // Clear existing rows
    userList.innerHTML = '';

    // Iterate over each user data
    usersData.forEach(user => {
        // Create a table row
        const row = document.createElement('tr');

        // Create table data for username, password, and email
        const usernameCell = document.createElement('td');
        usernameCell.textContent = user.username;

        const passwordCell = document.createElement('td');
        passwordCell.textContent = '******'; // Display asterisks instead of the actual password

        const emailCell = document.createElement('td');
        emailCell.textContent = user.email;

        // Append cells to the row
        row.appendChild(usernameCell);
        row.appendChild(passwordCell);
        row.appendChild(emailCell);

        // Create Font Awesome icons for actions
        const revealIcon = document.createElement('i');
        revealIcon.className = 'fas fa-eye';
        revealIcon.style.cursor = 'pointer';

        const hideIcon = document.createElement('i');
        hideIcon.className = 'fas fa-eye-slash';
        hideIcon.style.cursor = 'pointer';
        hideIcon.style.display = 'none'; // Initially hide the hide icon

        revealIcon.addEventListener('click', () => {
            passwordCell.textContent = user.password;
            revealIcon.style.display = 'none';
            hideIcon.style.display = 'inline';
        });

        hideIcon.addEventListener('click', () => {
            passwordCell.textContent = '******';
            revealIcon.style.display = 'inline';
            hideIcon.style.display = 'none';
        });

        // Create a table data cell for the password actions
        const passwordActionsCell = document.createElement('td');
        passwordActionsCell.appendChild(revealIcon);
        passwordActionsCell.appendChild(hideIcon);
        row.appendChild(passwordActionsCell);

        // Create Font Awesome icons for account actions
        const blockIcon = document.createElement('i');
        blockIcon.className = 'fas fa-ban text-danger';
        blockIcon.style.cursor = 'pointer';
        blockIcon.title = 'Block Account';

        const unblockIcon = document.createElement('i');
        unblockIcon.className = 'fas fa-lock text-warning';
        unblockIcon.style.cursor = 'pointer';
        unblockIcon.title = 'Unblock Account';

        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'fas fa-trash-alt text-danger';
        deleteIcon.style.cursor = 'pointer';
        deleteIcon.title = 'Delete Account';

        blockIcon.addEventListener('click', () => {
            const index = usersData.findIndex(u => u.username === user.username);
            if (index !== -1) {
                usersData[index].status = 'blocked';
                updateLocalStorage(usersData);
                displayUsers();
            }
        });

        unblockIcon.addEventListener('click', () => {
            const index = usersData.findIndex(u => u.username === user.username);
            if (index !== -1) {
                usersData[index].status = 'inactive';
                updateLocalStorage(usersData);
                displayUsers();
            }
        });

        deleteIcon.addEventListener('click', () => {
            const index = usersData.findIndex(u => u.username === user.username);
            if (index !== -1) {
                usersData.splice(index, 1);
                updateLocalStorage(usersData);
                displayUsers();
            }
        });

        const accountActionsCell = document.createElement('td');
        accountActionsCell.appendChild(blockIcon);
        accountActionsCell.appendChild(unblockIcon);
        accountActionsCell.appendChild(deleteIcon);
        row.appendChild(accountActionsCell);

        userList.appendChild(row);
    });
}

function goBack() {
    window.history.back();
}

displayUsers();
