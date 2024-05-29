function getEvents() {
    const storedEvents = localStorage.getItem('events');
    return storedEvents ? JSON.parse(storedEvents) : [];
}

function renderEventList() {
    const event = getEvents();
    const eventContainer = document.getElementById('event-list');

    eventContainer.innerHTML = '';

    event.forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('evento');

        if (event.image) {
            const imageDiv = document.createElement('div');
            imageDiv.classList.add('image');
            const img = document.createElement('img');
            img.src = event.image;
            img.alt = event.name;
            imageDiv.appendChild(img);
            eventDiv.appendChild(imageDiv);
        }

        const nameDiv = document.createElement('div');
        nameDiv.classList.add('nome');
        nameDiv.textContent = event.name;

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('conteudo');
        contentDiv.textContent = event.messageBody;

        eventDiv.appendChild(nameDiv);
        eventDiv.appendChild(contentDiv);

        eventContainer.appendChild(eventDiv);
    });
}

window.addEventListener('load', renderEventList);
