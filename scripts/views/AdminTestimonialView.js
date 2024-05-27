import { Testimonial } from '../models/testimonial_model.js';

const testimonialForm = document.getElementById('testimonialForm');
const testimonialList = document.getElementById('testimonialList');
const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
let editIndex = -1; // Store index of the testimonial being edited

function saveTestimonials() {
    localStorage.setItem('testimonials', JSON.stringify(testimonials));
}

function displayTestimonials() {
    testimonialList.innerHTML = '';

    testimonials.forEach((testimonial, index) => {
        const testimonialCard = document.createElement('div');
        testimonialCard.classList.add('testimonial-card', 'card', 'mb-3');

        if (testimonial.image) {
            const testimonialImage = document.createElement('img');
            testimonialImage.src = testimonial.image;
            testimonialImage.alt = `${testimonial.name}'s image`;
            testimonialImage.classList.add('card-img-top', 'testimonial-image');
            testimonialCard.appendChild(testimonialImage);
        }

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const testimonialName = document.createElement('h5');
        testimonialName.textContent = testimonial.name;
        testimonialName.classList.add('card-title');

        const testimonialTitle = document.createElement('h6');
        testimonialTitle.textContent = testimonial.title;
        testimonialTitle.classList.add('card-subtitle', 'mb-2', 'text-muted');

        const testimonialDate = document.createElement('p');
        testimonialDate.textContent = 'Date: ' + testimonial.date;
        testimonialDate.classList.add('card-text');

        const testimonialMessage = document.createElement('p');
        testimonialMessage.textContent = testimonial.messageBody;
        testimonialMessage.classList.add('card-text');

        // Create a div to hold the buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('card-buttons');

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('btn', 'btn-warning');
        editButton.addEventListener('click', () => {
            loadTestimonialForEdit(index);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.addEventListener('click', () => {
            deleteTestimonial(index);
        });

        // Add buttons to the container
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);

        cardBody.appendChild(testimonialName);
        cardBody.appendChild(testimonialTitle);
        cardBody.appendChild(testimonialDate);
        cardBody.appendChild(testimonialMessage);
        cardBody.appendChild(buttonContainer);

        testimonialCard.appendChild(cardBody);
        testimonialList.appendChild(testimonialCard);
    });
}

function deleteTestimonial(index) {
    testimonials.splice(index, 1);
    saveTestimonials();
    displayTestimonials();
}

function loadTestimonialForEdit(index) {
    const testimonial = testimonials[index];
    document.getElementById('testimonialName').value = testimonial.name;
    document.getElementById('testimonialTitle').value = testimonial.title;
    document.getElementById('testimonialDate').value = testimonial.date;
    document.getElementById('testimonialMessage').value = testimonial.messageBody;
    document.getElementById('testimonialImage').value = ''; 
    editIndex = index; 
}

testimonialForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('testimonialName').value;
    const title = document.getElementById('testimonialTitle').value;
    const date = document.getElementById('testimonialDate').value;
    const messageBody = document.getElementById('testimonialMessage').value;
    const imageFile = document.getElementById('testimonialImage').files[0];

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const image = e.target.result;
            if (editIndex === -1) {
                addTestimonial(name, title, date, messageBody, image);
            } else {
                updateTestimonial(editIndex, name, title, date, messageBody, image);
            }
        };
        reader.readAsDataURL(imageFile);
    } else {
        if (editIndex === -1) {
            addTestimonial(name, title, date, messageBody, '');
        } else {
            updateTestimonial(editIndex, name, title, date, messageBody);
        }
    }
});

function addTestimonial(name, title, date, messageBody, image) {
    const newTestimonial = new Testimonial(name, title, date, messageBody, image);
    testimonials.push(newTestimonial);
    saveTestimonials();
    testimonialForm.reset();
    displayTestimonials();
}

function updateTestimonial(index, name, title, date, messageBody, image) {
    testimonials[index].name = name;
    testimonials[index].title = title;
    testimonials[index].date = date;
    testimonials[index].messageBody = messageBody;
    if (image) {
        testimonials[index].image = image;
    }
    saveTestimonials();
    testimonialForm.reset();
    editIndex = -1;
    displayTestimonials();
}

displayTestimonials();
