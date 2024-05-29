
const projectForm = document.getElementById('projectForm');
const projectList = document.getElementById('projectList');
const projects = JSON.parse(localStorage.getItem('projects')) || [];
let editIndex = -1; 

function saveProjects() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

function displayProjects() {
    projectList.innerHTML = '';

    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card', 'card', 'mb-3');

        if (project.image) {
            const projectImage = document.createElement('img');
            projectImage.src = project.image;
            projectImage.alt = `${project.name}'s image`;
            projectImage.classList.add('card-img-top', 'project-image');
            projectCard.appendChild(projectImage);
        }

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const projectName = document.createElement('h5');
        projectName.textContent = project.name;
        projectName.classList.add('card-title');

        const projectMessage = document.createElement('p');
        projectMessage.textContent = project.messageBody;
        projectMessage.classList.add('card-text');

        // Create a div to hold the buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('card-buttons');

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('btn', 'btn-warning');
        editButton.addEventListener('click', () => {
            loadprojectForEdit(index);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.addEventListener('click', () => {
            deleteproject(index);
        });

        // Add buttons to the container
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);

        cardBody.appendChild(projectName);
        cardBody.appendChild(projectMessage);
        cardBody.appendChild(buttonContainer);

        projectCard.appendChild(cardBody);
        projectList.appendChild(projectCard);
    });
}

function deleteproject(index) {
    projects.splice(index, 1);
    saveProjects();
    displayProjects();
}

function loadprojectForEdit(index) {
    const project = projects[index];
    document.getElementById('projectName').value = project.name;
    document.getElementById('projectMessage').value = project.messageBody;
    document.getElementById('projectImage').value = ''; 
    editIndex = index; 
}

projectForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('projectName').value;
    const messageBody = document.getElementById('projectMessage').value;
    const imageFile = document.getElementById('projectImage').files[0];

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const image = e.target.result;
            if (editIndex === -1) {
                addproject(name,  messageBody, image);
            } else {
                updateproject(editIndex, name, messageBody, image);
            }
        };
        reader.readAsDataURL(imageFile);
    } else {
        if (editIndex === -1) {
            addproject(name, messageBody, '');
        } else {
            updateproject(editIndex, name, messageBody);
        }
    }
});

function addproject(name, messageBody, image) {
    const newproject = new project(name, messageBody, image);
    projects.push(newproject);
    saveProjects();
    projectForm.reset();
    displayProjects();
}

function updateproject(index, name, messageBody, image) {
    projects[index].name = name;
    projects[index].messageBody = messageBody;
    if (image) {
        projects[index].image = image;
    }
    saveProjects();
    projectForm.reset();
    editIndex = -1;
    displayProjects();
}

displayProjects();
