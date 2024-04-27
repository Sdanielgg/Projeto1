let users = [];

window.addEventListener('DOMContentLoaded', function() {
    let savedUsers = localStorage.getItem('users');
    if (savedUsers) {
        users = JSON.parse(savedUsers);
    }
});

function registerUser(nome, idade, sexo, localidade, email, username, password) {
    if (getUserByEmail(email)) {
        return { success: false, message: "Email already registered." };
    }

    let newUser = {
        nome: nome,
        idade: idade,
        sexo: sexo,
        localidade: localidade,
        email: email,
        username: username,
        password: password,
        status: "inactive" // Set status to inactive initially
    };

    users.push(newUser);

    localStorage.setItem('users', JSON.stringify(users)); 
    return { success: true, user: newUser };
}

function getUserByEmail(email) {
    return users.find(user => user.email === email);
}

function showAlert(message, alertType) {
    let alert = document.createElement("div");
    alert.classList.add("alert", "alert-dismissible", "fade", "show", "mt-3");
    alert.setAttribute("role", "alert");

    if (alertType === "success") {
        alert.classList.add("alert-success");
    } else if (alertType === "danger") {
        alert.classList.add("alert-danger");
    }

    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    document.getElementById("alertContainer").appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 5000);
}

function validateRegistration(nome, idade, sexo, localidade, email, username, password, confirmPassword) {
    if (!nome || !idade || !sexo || !localidade || !email || !username || !password || !confirmPassword) {
        return { success: false, message: "All fields are required." };
    }

    if (password !== confirmPassword) {
        return { success: false, message: "Passwords do not match." };
    }

    return { success: true };
}

function showTextBox() {
    var selectBox = document.getElementById("sexo");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    var outroField = document.getElementById("outroField");

    if (selectedValue === "Outro") {
        outroField.classList.remove("hidden");
    } else {
        outroField.classList.add("hidden");
    }
}

document.getElementById("Register-Button").addEventListener("click", function() {
    let nome = document.querySelector('.Register-Container input[placeholder="Nome"]').value;
    let email = document.querySelector('.Register-Container input[placeholder="Email"]').value;
    let idade = document.querySelector('.Register-Container input[placeholder="Idade"]').value;
    let sexo = document.getElementById("sexo").value;
    let localidade = document.querySelector('.Register-Container input[placeholder="Localidade"]').value;
    let username = document.querySelector('.Register-Container input[placeholder="Username"]').value;
    let password = document.querySelector('.Register-Container input[placeholder="Password"]').value;
    let confirmPassword = document.querySelector('.Register-Container input[placeholder="Confirmar Password"]').value;

    let validation = validateRegistration(nome, idade, sexo, localidade, email, username, password, confirmPassword);
    if (!validation.success) {
        showAlert(validation.message, "danger");
        return;
    }

    let registrationResult = registerUser(nome, idade, sexo, localidade, email, username, password);
    if (registrationResult.success) {
        showAlert("Account created successfully!", "success");
        console.log("New user registered:", registrationResult.user);
    } else {
        showAlert(registrationResult.message, "danger");
    }
});

function verifyLogin(username, password) {
    let user = users.find(user => user.username === username);
    
    if (!user || user.password !== password) {
        return { success: false, message: "Invalid username or password." };
    }

    // Update user status to active upon successful login
    user.status = "active";

    // Update localStorage
    localStorage.setItem('users', JSON.stringify(users));

    return { success: true, user: user };
}

document.getElementById("Login-Button").addEventListener("click", function() {
    let username = document.querySelector('.Login-container input[placeholder="Username"]').value;
    let password = document.querySelector('.Login-container input[type="password"]').value;

    let loginResult = verifyLogin(username, password);
    if (loginResult.success) {
        showAlert("Login successful!", "success");
        console.log("Logged in user:", loginResult.user);
    } else {
        showAlert(loginResult.message, "danger");
    }
});
