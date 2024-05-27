// Function to retrieve testimonials from localStorage
function getTestimonials() {
    const storedTestimonials = localStorage.getItem('testimonials');
    return storedTestimonials ? JSON.parse(storedTestimonials) : [];
}

// Function to render testimonial list
function renderTestimonialList() {
    const testimonials = getTestimonials();
    const testimonialContainer = document.getElementById('testimonial-list');

    // Clear existing content
    testimonialContainer.innerHTML = '';

    // Render each testimonial
    testimonials.forEach(testimonial => {
        const testimonialDiv = document.createElement('div');
        testimonialDiv.classList.add('testemunho');

        // Create and append image element
        if (testimonial.image) {
            const imageDiv = document.createElement('div');
            imageDiv.classList.add('image');
            const img = document.createElement('img');
            img.src = testimonial.image;
            img.alt = testimonial.name;
            imageDiv.appendChild(img);
            testimonialDiv.appendChild(imageDiv);
        }

        // Create and append name element
        const nameDiv = document.createElement('div');
        nameDiv.classList.add('nome');
        nameDiv.textContent = testimonial.name;

        // Create and append title element
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('titulo');
        titleDiv.textContent = testimonial.title;

        // Create and append content element
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('conteudo');
        contentDiv.textContent = testimonial.messageBody;

        testimonialDiv.appendChild(nameDiv);
        testimonialDiv.appendChild(titleDiv);
        testimonialDiv.appendChild(contentDiv);

        testimonialContainer.appendChild(testimonialDiv);
    });
}

// Call renderTestimonialList function when the page loads
window.addEventListener('load', renderTestimonialList);
