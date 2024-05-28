function getRandomDirection() {
    const speed = 2;
    const angle = Math.random() * 2 * Math.PI; 
    return {
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed
    };
}

const images = [
    {element: document.getElementById('img1'), x: 50, y: 50, ...getRandomDirection(), url: 'room1.html', originalSrc: 'style/images/virus.png', hoverSrc: 'style/images/greenVirus.png'},
    {element: document.getElementById('img2'), x: 200, y: 200, ...getRandomDirection(), url: 'room1.html', originalSrc: 'style/images/virus.png', hoverSrc: 'style/images/greenVirus.png'},
    {element: document.getElementById('img3'), x: 350, y: 50, ...getRandomDirection(), url: 'room1.html', originalSrc: 'style/images/virus.png', hoverSrc: 'style/images/greenVirus.png'},
    {element: document.getElementById('img4'), x: 500, y: 200, ...getRandomDirection(), url: 'room1.html', originalSrc: 'style/images/virus.png', hoverSrc: 'style/images/greenVirus.png'},
];

images.forEach(img => {

    img.element.addEventListener('click', () => {
        window.location.href = img.url;
    });

    img.element.addEventListener('mouseover', () => {
        img.element.src = img.hoverSrc;
    });


    img.element.addEventListener('mouseout', () => {
        img.element.src = img.originalSrc;
    });
});

function updatePosition() {
    images.forEach(img => {
        img.x += img.dx;
        img.y += img.dy;

        if (img.x <= 0 || img.x + img.element.width >= window.innerWidth) {
            img.dx *= -1;
        }
        if (img.y <= 0 || img.y + img.element.height >= window.innerHeight) {
            img.dy *= -1;
        }

        images.forEach(otherImg => {
            if (img !== otherImg) {
                if (img.x < otherImg.x + otherImg.element.width &&
                    img.x + img.element.width > otherImg.x &&
                    img.y < otherImg.y + otherImg.element.height &&
                    img.y + img.element.height > otherImg.y) {
                    img.dx *= -1;
                    img.dy *= -1;
                    otherImg.dx *= -1;
                    otherImg.dy *= -1;
                }
            }
        });

        img.element.style.left = img.x + 'px';
        img.element.style.top = img.y + 'px';
    });
}

function animate() {
    updatePosition();
    requestAnimationFrame(animate);
}

animate();