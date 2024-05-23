const usersData = JSON.parse(localStorage.getItem('users')) || [];

function updateLocalStorage(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function displayUsers() {
    const userList = document.getElementById('userList');

    userList.innerHTML = '';

    usersData.forEach(user => {
        const userCard = document.createElement('div');
        userCard.classList.add('col-md-4', 'mb-4'); 

        userCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${user.username}</h5>
                    <p class="card-text">Email: ${user.email}</p>
                    ${user.status === 'blocked' ? '<span class="badge bg-danger">Blocked</span>' : ''}
                    <div class="account-actions mt-3">
                        <button class="btn btn-danger btn-sm me-1 block-btn" data-username="${user.username}">
                            <i class="fas fa-ban"></i> Block
                        </button>
                        <button class="btn btn-warning btn-sm me-1 unblock-btn" data-username="${user.username}">
                            <i class="fas fa-lock"></i> Unblock
                        </button>
                        <button class="btn btn-secondary btn-sm delete-btn" data-username="${user.username}">
                            <i class="fas fa-trash-alt"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        `;

        userList.appendChild(userCard);
    });

    document.querySelectorAll('.block-btn').forEach(button => {
        button.addEventListener('click', () => {
            const username = button.getAttribute('data-username');
            const index = usersData.findIndex(u => u.username === username);
            if (index !== -1) {
                usersData[index].status = 'blocked';
                updateLocalStorage(usersData);
                displayUsers();
            }
        });
    });

    document.querySelectorAll('.unblock-btn').forEach(button => {
        button.addEventListener('click', () => {
            const username = button.getAttribute('data-username');
            const index = usersData.findIndex(u => u.username === username);
            if (index !== -1) {
                usersData[index].status = 'inactive';
                updateLocalStorage(usersData);
                displayUsers();
            }
        });
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', () => {
            const username = button.getAttribute('data-username');
            const index = usersData.findIndex(u => u.username === username);
            if (index !== -1) {
                usersData.splice(index, 1);
                updateLocalStorage(usersData);
                displayUsers();
            }
        });
    });
}

function goBack() {
    window.location.href = './admin_page.html'; 
}

document.addEventListener('DOMContentLoaded', displayUsers);
