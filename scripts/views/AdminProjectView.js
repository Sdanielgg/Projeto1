import { Project } from '../models/project_model.js';

const projectForm = document.getElementById('projectForm');
const projectList = document.getElementById('projectList');
const projects = JSON.parse(localStorage.getItem('projects')) || [];

function saveProjects() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

function displayProjects() {
    projectList.innerHTML = '';

    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card', 'card', 'mb-3');

        try {
            if (project.image && project.image !== '') {
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

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('btn', 'btn-danger');
            deleteButton.addEventListener('click', () => {
                deleteProject(index);
            });

            cardBody.appendChild(projectName);
            cardBody.appendChild(projectMessage);
            cardBody.appendChild(deleteButton);

            projectCard.appendChild(cardBody);
            projectList.appendChild(projectCard);
        } catch (error) {
            console.error('Error displaying project:', error, project);
        }
    });
}

function deleteProject(index) {
    projects.splice(index, 1);
    saveProjects();
    displayProjects();
}

projectForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('projectName').value;
    const messageBody = document.getElementById('projectMessage').value;
    const imageFile = document.getElementById('projectImage').files[0];
    let image = '';

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
            image = e.target.result;
            addProject(name, messageBody, image);
        };
        reader.readAsDataURL(imageFile);
    } else {
        addProject(name, messageBody, image);
    }
});

function addProject(name, messageBody, image) {
    const newProject = new Project(name, messageBody, image);
    projects.push(newProject);
    saveProjects();
    projectForm.reset();
    displayProjects();
}

displayProjects();
