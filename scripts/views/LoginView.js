function showTextBox() {
    const selectedOption = document.getElementById("sexo").value;
    const outroField = document.getElementById("outroField");

    if (selectedOption === "Outro") {
        outroField.classList.remove("hidden");
    } else {
        outroField.classList.add("hidden");
    }
}

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

function registerUser() {
    const nome = document.querySelector('#Register input[placeholder="Nome"]').value;
    const email = document.querySelector('#Register input[placeholder="Email"]').value;
    const idade = document.querySelector('#Register input[placeholder="Idade"]').value;
    const sexo = document.querySelector('#sexo').value;
    const localidade = document.querySelector('#Register input[placeholder="Localidade"]').value;
    const username = document.querySelector('#Register input[placeholder="Username"]').value;
    const password = document.querySelector('#Register input[placeholder="Password"]').value;
    const confirmPassword = document.querySelector('#Register input[placeholder="Confirmar Password"]').value;

    if (password !== confirmPassword) {
        displayAlert("Passwords don't match", "danger");
        return;
    }

    const newUser = new User(nome, idade, sexo, localidade, email, username, password);

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    displayAlert('Registration successful!', 'success');
}
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function handleLoginSuccess() {
    displayAlert('Login successful!', 'success');
    
    await wait(1000); // Wait for 1 second (1000 milliseconds)
    
    window.location.href = "./main.html";
  }
  
  // Call the function to handle login success

function loginUser() {
    const username = document.querySelector('#Login input[placeholder="Username"]').value;
    const password = document.querySelector('#Login input[placeholder="Password"]').value;
    const email =document.querySelector('#Login input[placeholder="Email"]').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const userIndex = users.findIndex(u => u.username === username && u.password === password && u.email===email);

    if (userIndex !== -1) {
        if (users[userIndex].status === 'blocked') {
            displayAlert('Your account is blocked. Please contact support.', 'danger');
        } else {
            users[userIndex].status = "active";
            localStorage.setItem('users', JSON.stringify(users));
            handleLoginSuccess();
        }
    } else {
        displayAlert('Invalid username or password', 'danger');
    }
}

document.getElementById('Register-Button').addEventListener('click', registerUser);
document.getElementById('Login-Button').addEventListener('click', loginUser);
