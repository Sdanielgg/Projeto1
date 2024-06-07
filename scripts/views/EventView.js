function getEvents() {
    const storedEvents = localStorage.getItem('events');
    return storedEvents ? JSON.parse(storedEvents) : [];
}

function renderEventList() {
    const events = getEvents();
    const eventContainer = document.getElementById('event-list');

    eventContainer.innerHTML = '';

    events.forEach(event => {
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

        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('details');

        const nameDiv = document.createElement('div');
        nameDiv.classList.add('nome');
        nameDiv.textContent = event.name;

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('conteudo');
        contentDiv.textContent = event.messageBody;

        detailsDiv.appendChild(nameDiv);
        detailsDiv.appendChild(contentDiv);

        eventDiv.appendChild(detailsDiv);
        eventContainer.appendChild(eventDiv);
    });
}

window.addEventListener('load', renderEventList);
