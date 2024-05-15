function showTextBox() {
    const selectedOption = document.getElementById("sexo").value;
    const outroField = document.getElementById("outroField");

    if (selectedOption === "Outro") {
        outroField.classList.remove("hidden");
    } else {
        outroField.classList.add("hidden");
    }
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
        alert("Passwords don't match");
        return;
    }

    const newUser = new User(nome, idade, sexo, localidade, email, username, password);

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful!');
}

function loginUser() {
    const username = document.querySelector('#Login input[placeholder="Username"]').value;
    const password = document.querySelector('#Login input[placeholder="Password"]').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        alert('Login successful!');
    } else {
        alert('Invalid username or password');
    }
}

document.getElementById('Register-Button').addEventListener('click', registerUser);
document.getElementById('Login-Button').addEventListener('click', loginUser);