document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('container');
    const points = [];
    const numPoints = 100; // Total de pontos

    const images = document.querySelectorAll('.image');

    // Função para gerar um número aleatório entre min e max
    function getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Função para verificar colisão entre dois retângulos
    function isColliding(rect1, rect2) {
        return !(rect1.right < rect2.left || 
                 rect1.left > rect2.right || 
                 rect1.bottom < rect2.top || 
                 rect1.top > rect2.bottom);
    }

    // Cria pontos com posições e direções aleatórias
    for (let i = 0; i < numPoints; i++) {
        const point = document.createElement('div');
        point.classList.add('point');
        container.appendChild(point);

        points.push({
            element: point,
            x: getRandom(0, window.innerWidth - 20),
            y: getRandom(0, window.innerHeight - 20),
            dx: getRandom(-3, 3), // Garantir que dx não seja 0
            dy: getRandom(-3, 3)   // Garantir que dy não seja 0
        });
    }

    function movePoints() {
        points.forEach(point => {
            // Move o ponto
            point.x += point.dx;
            point.y += point.dy;

            // Verifica colisão com as bordas do contêiner
            if (point.x <= 0 || point.x >= window.innerWidth - 20) {
                point.dx *= -1; // Inverte a direção no eixo x
            }
            if (point.y <= 0 || point.y >= window.innerHeight - 20) {
                point.dy *= -1; // Inverte a direção no eixo y
            }

            // Verifica colisão com as imagens
            const pointRect = {
                left: point.x,
                right: point.x + 20,
                top: point.y,
                bottom: point.y + 20
            };

            images.forEach(img => {
                const imgRect = img.getBoundingClientRect();
                if (isColliding(pointRect, imgRect)) {
                    if (point.dx > 0 && pointRect.right > imgRect.left && pointRect.left < imgRect.left) {
                        point.dx *= -1;
                    } else if (point.dx < 0 && pointRect.left < imgRect.right && pointRect.right > imgRect.right) {
                        point.dx *= -1;
                    }
                    if (point.dy > 0 && pointRect.bottom > imgRect.top && pointRect.top < imgRect.top) {
                        point.dy *= -1;
                    } else if (point.dy < 0 && pointRect.top < imgRect.bottom && pointRect.bottom > imgRect.bottom) {
                        point.dy *= -1;
                    }
                }
            });

            // Atualiza a posição do elemento ponto
            point.element.style.left = `${point.x}px`;
            point.element.style.top = `${point.y}px`;
        });

        requestAnimationFrame(movePoints);
    }

    movePoints();
});




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
 