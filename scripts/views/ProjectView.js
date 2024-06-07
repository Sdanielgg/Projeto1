function getProjects() {
    const storedProjects = localStorage.getItem('projects');
    return storedProjects ? JSON.parse(storedProjects) : [];
}

function renderProjectList() {
    const projects = getProjects();
    const projectContainer = document.getElementById('project-list');

    projectContainer.innerHTML = '';

    projects.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('projeto');

        if (project.image) {
            const imageDiv = document.createElement('div');
            imageDiv.classList.add('image');
            const img = document.createElement('img');
            img.src = project.image;
            img.alt = project.name;
            imageDiv.appendChild(img);
            projectDiv.appendChild(imageDiv);
        }

        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('details');

        const nameDiv = document.createElement('div');
        nameDiv.classList.add('nome');
        nameDiv.textContent = project.name;

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('conteudo');
        contentDiv.textContent = project.messageBody;

        detailsDiv.appendChild(nameDiv);
        detailsDiv.appendChild(contentDiv);

        projectDiv.appendChild(detailsDiv);
        projectContainer.appendChild(projectDiv);
    });
}

window.addEventListener('load', renderProjectList);
