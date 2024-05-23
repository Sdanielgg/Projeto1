import { Testimonial } from '../models/testimonial_model.js';

const testimonialForm = document.getElementById('testimonialForm');
const testimonialList = document.getElementById('testimonialList');
const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];

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

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.addEventListener('click', () => {
            deleteTestimonial(index);
        });

        cardBody.appendChild(testimonialName);
        cardBody.appendChild(testimonialTitle);
        cardBody.appendChild(testimonialDate);
        cardBody.appendChild(testimonialMessage);
        cardBody.appendChild(deleteButton);

        testimonialCard.appendChild(cardBody);
        testimonialList.appendChild(testimonialCard);
    });
}

function deleteTestimonial(index) {
    testimonials.splice(index, 1);
    saveTestimonials();
    displayTestimonials();
}

testimonialForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('testimonialName').value;
    const title = document.getElementById('testimonialTitle').value;
    const date = document.getElementById('testimonialDate').value;
    const messageBody = document.getElementById('testimonialMessage').value;
    const imageFile = document.getElementById('testimonialImage').files[0];
    let image = '';

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
            image = e.target.result;
            addTestimonial(name, title, date, messageBody, image);
        };
        reader.readAsDataURL(imageFile);
    } else {
        addTestimonial(name, title, date, messageBody, image);
    }
});

function addTestimonial(name, title, date, messageBody, image) {
    const newTestimonial = new Testimonial(name, title, date, messageBody, image);
    testimonials.push(newTestimonial);
    saveTestimonials();
    testimonialForm.reset();
    displayTestimonials();
}

displayTestimonials();
