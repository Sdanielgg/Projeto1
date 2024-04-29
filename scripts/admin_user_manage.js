const usersData = JSON.parse(localStorage.getItem('users'));

function updateLocalStorage(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function displayUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    usersData.forEach(user => {
        const row = document.createElement('tr');
        const usernameCell = document.createElement('td');
        usernameCell.textContent = user.username;
        const passwordCell = document.createElement('td');
        passwordCell.textContent = '******';
        const emailCell = document.createElement('td');
        emailCell.textContent = user.email;
        row.appendChild(usernameCell);
        row.appendChild(passwordCell);
        row.appendChild(emailCell);

        const revealIcon = document.createElement('i');
        revealIcon.className = 'fas fa-eye';
        revealIcon.style.cursor = 'pointer';
        const hideIcon = document.createElement('i');
        hideIcon.className = 'fas fa-eye-slash';
        hideIcon.style.cursor = 'pointer';
        hideIcon.style.display = 'none';
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
        const passwordActionsCell = document.createElement('td');
        passwordActionsCell.appendChild(revealIcon);
        passwordActionsCell.appendChild(hideIcon);
        row.appendChild(passwordActionsCell);

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
displayUsers();
