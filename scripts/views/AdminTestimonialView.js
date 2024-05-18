// AdminTestimonialView.js
import { Testimonial } from '../models/TestimonialModel.js';

const testimonialForm = document.getElementById('testimonialForm');
const testimonialList = document.getElementById('testimonialList');
const testimonialTableBody = document.getElementById('testimonialTableBody');

// Retrieve testimonials from localStorage or initialize an empty array
const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];

// Function to save testimonials to localStorage
function saveTestimonials() {
    localStorage.setItem('testimonials', JSON.stringify(testimonials));
}

// Function to display testimonials in card view
function displayTestimonials() {
    testimonialList.innerHTML = ''; // Clear previous content

    testimonials.forEach(testimonial => {
        const testimonialCard = document.createElement('div');
        testimonialCard.classList.add('testimonial-card', 'card', 'mb-3');

        const testimonialImage = document.createElement('img');
        testimonialImage.src = testimonial.image;
        testimonialImage.alt = `${testimonial.name}'s image`;
        testimonialImage.classList.add('card-img-top', 'testimonial-image');

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

        cardBody.appendChild(testimonialName);
        cardBody.appendChild(testimonialTitle);
        cardBody.appendChild(testimonialDate);
        cardBody.appendChild(testimonialMessage);

        testimonialCard.appendChild(testimonialImage);
        testimonialCard.appendChild(cardBody);

        testimonialList.appendChild(testimonialCard);
    });
}

// Function to display testimonials in table view
function displayTestimonialsTable() {
    testimonialTableBody.innerHTML = ''; // Clear previous content

    testimonials.forEach(testimonial => {
        const row = document.createElement('tr');

        const cellImage = document.createElement('td');
        const img = document.createElement('img');
        img.src = testimonial.image;
        img.alt = `${testimonial.name}'s image`;
        img.classList.add('testimonial-table-image');
        cellImage.appendChild(img);
        row.appendChild(cellImage);

        const cellName = document.createElement('td');
        cellName.textContent = testimonial.name;
        row.appendChild(cellName);

        const cellTitle = document.createElement('td');
        cellTitle.textContent = testimonial.title;
        row.appendChild(cellTitle);

        const cellDate = document.createElement('td');
        cellDate.textContent = testimonial.date;
        row.appendChild(cellDate);

        const cellMessage = document.createElement('td');
        cellMessage.textContent = testimonial.messageBody;
        row.appendChild(cellMessage);

        testimonialTableBody.appendChild(row);
    });
}

// Event listener for form submission
testimonialForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('testimonialName').value;
    const title = document.getElementById('testimonialTitle').value;
    const date = document.getElementById('testimonialDate').value;
    const messageBody = document.getElementById('testimonialMessage').value;
    const image = ''; // Set this to the appropriate value if image input is added

    const newTestimonial = new Testimonial(name, title, date, messageBody, image);
    testimonials.push(newTestimonial);

    // Save the updated testimonials to localStorage
    saveTestimonials();

    // Clear the form
    testimonialForm.reset();

    // Display the updated testimonials
    displayTestimonials();
    displayTestimonialsTable();
});

// Initial call to display testimonials if there are any pre-loaded
displayTestimonials();
displayTestimonialsTable();
