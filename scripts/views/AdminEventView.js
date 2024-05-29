
const eventForm = document.getElementById('eventForm');
const eventList = document.getElementById('eventList');
const events = JSON.parse(localStorage.getItem('events')) || [];
let editIndex = -1; 

function saveEvents() {
    localStorage.setItem('events', JSON.stringify(events));
}

function displayEvents() {
    eventList.innerHTML = '';

    events.forEach((event, index) => {
        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card', 'card', 'mb-3');

        if (event.image) {
            const eventImage = document.createElement('img');
            eventImage.src = event.image;
            eventImage.alt = `${event.name}'s image`;
            eventImage.classList.add('card-img-top', 'event-image');
            eventCard.appendChild(eventImage);
        }

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const eventName = document.createElement('h5');
        eventName.textContent = event.name;
        eventName.classList.add('card-title');

        const eventMessage = document.createElement('p');
        eventMessage.textContent = event.messageBody;
        eventMessage.classList.add('card-text');

        // Create a div to hold the buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('card-buttons');

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('btn', 'btn-warning');
        editButton.addEventListener('click', () => {
            loadEventForEdit(index);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.addEventListener('click', () => {
            deleteEvent(index);
        });

        // Add buttons to the container
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);

        cardBody.appendChild(eventName);
        cardBody.appendChild(eventMessage);
        cardBody.appendChild(buttonContainer);

        eventCard.appendChild(cardBody);
        eventList.appendChild(eventCard);
    });
}

function deleteEvent(index) {
    events.splice(index, 1);
    saveEvents();
    displayEvents();
}

function loadEventForEdit(index) {
    const event = events[index];
    document.getElementById('eventName').value = event.name;
    document.getElementById('eventMessage').value = event.messageBody;
    document.getElementById('eventImage').value = ''; 
    editIndex = index; 
}

eventForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('eventName').value;
    const messageBody = document.getElementById('eventMessage').value;
    const imageFile = document.getElementById('eventImage').files[0];

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const image = e.target.result;
            if (editIndex === -1) {
                addEvent(name,  messageBody, image);
            } else {
                updateEvent(editIndex, name, messageBody, image);
            }
        };
        reader.readAsDataURL(imageFile);
    } else {
        if (editIndex === -1) {
            addEvent(name, messageBody, '');
        } else {
            updateEvent(editIndex, name, messageBody);
        }
    }
});

function addEvent(name, messageBody, image) {
    const newevent = new Event(name, messageBody, image);
    events.push(newevent);
    saveEvents();
    eventForm.reset();
    displayEvents();
}

function updateEvent(index, name, messageBody, image) {
    events[index].name = name;
    events[index].messageBody = messageBody;
    if (image) {
        events[index].image = image;
    }
    saveEvents();
    eventForm.reset();
    editIndex = -1;
    displayEvents();
}

displayEvents();
