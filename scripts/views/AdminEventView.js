import { Event } from '../models/event_model.js';

const eventForm = document.getElementById('eventForm');
const eventList = document.getElementById('eventList');
const events = JSON.parse(localStorage.getItem('events')) || [];

function saveevents() {
    localStorage.setItem('events', JSON.stringify(events));
}

function displayevents() {
    eventList.innerHTML = '';

    events.forEach((event, index) => {
        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card', 'card', 'mb-3');

        try {
            if (event.image && event.image !== '') {
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

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('btn', 'btn-danger');
            deleteButton.addEventListener('click', () => {
                deleteevent(index);
            });

            cardBody.appendChild(eventName);
            cardBody.appendChild(eventMessage);
            cardBody.appendChild(deleteButton);

            eventCard.appendChild(cardBody);
            eventList.appendChild(eventCard);
        } catch (error) {
            console.error('Error displaying event:', error, event);
        }
    });
}

function deleteevent(index) {
    events.splice(index, 1);
    saveevents();
    displayevents();
}

eventForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('eventName').value;
    const messageBody = document.getElementById('eventMessage').value;
    const imageFile = document.getElementById('eventImage').files[0];
    let image = '';

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
            image = e.target.result;
            addevent(name, messageBody, image);
        };
        reader.readAsDataURL(imageFile);
    } else {
        addevent(name, messageBody, image);
    }
});

function addevent(name, messageBody, image) {
    const newEvent = new Event(name, messageBody, image);
    events.push(newEvent);
    saveevents();
    eventForm.reset();
    displayevents();
}

displayevents();
