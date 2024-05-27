function getTestimonials() {
    const storedTestimonials = localStorage.getItem('testimonials');
    return storedTestimonials ? JSON.parse(storedTestimonials) : [];
}

function renderTestimonialList() {
    const testimonials = getTestimonials();
    const testimonialContainer = document.getElementById('testimonial-list');

    testimonialContainer.innerHTML = '';

    testimonials.forEach(testimonial => {
        const testimonialDiv = document.createElement('div');
        testimonialDiv.classList.add('testemunho');

        if (testimonial.image) {
            const imageDiv = document.createElement('div');
            imageDiv.classList.add('image');
            const img = document.createElement('img');
            img.src = testimonial.image;
            img.alt = testimonial.name;
            imageDiv.appendChild(img);
            testimonialDiv.appendChild(imageDiv);
        }

        const nameDiv = document.createElement('div');
        nameDiv.classList.add('nome');
        nameDiv.textContent = testimonial.name;

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('titulo');
        titleDiv.textContent = testimonial.title;

        const dateDiv = document.createElement('div');
        dateDiv.classList.add('data');
        dateDiv.textContent = `Data: ${testimonial.date}`;

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('conteudo');
        contentDiv.textContent = testimonial.messageBody;

        testimonialDiv.appendChild(nameDiv);
        testimonialDiv.appendChild(titleDiv);
        testimonialDiv.appendChild(dateDiv);
        testimonialDiv.appendChild(contentDiv);

        testimonialContainer.appendChild(testimonialDiv);
    });
}

window.addEventListener('load', renderTestimonialList);
