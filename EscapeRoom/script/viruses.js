const fillInBlanksDone = localStorage.getItem('fillInBlanksDone') === 'true';
const room2Done = localStorage.getItem('room2Done') === 'true';
const puzzleDone = localStorage.getItem('puzzleDone') === 'true';
if(fillInBlanksDone == true){
  document.getElementById("img1").src = "style/images/greenVirus.png"
}
if(room2Done == true){
    document.getElementById("img2").src = "style/images/greenVirus.png"
  }
  if(puzzleDone == true){
    document.getElementById("img3").src = "style/images/greenVirus.png"
  }


function Points1(){

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('container');
    const points = [];
    const numPoints = 60; // Total de pontos

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
        if(fillInBlanksDone == true){
            point.style.background = "#119822";
        }else {
            point.style.background = "#E30613";
        }

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

            // Atualiza a posição do elemento ponto
            point.element.style.left = `${point.x}px`;
            point.element.style.top = `${point.y}px`;
        });

        requestAnimationFrame(movePoints);
    }

    movePoints();
});
}

function Points2(){
    document.addEventListener("DOMContentLoaded", () => {
        const container = document.getElementById('container');
        const points = [];
        const numPoints = 70; // Total de pontos
    
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
            if(room2Done == true){
                point.style.background = "#119822";
            }else {
                point.style.background = "#E30613";
            }
    
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
    
                // Atualiza a posição do elemento ponto
                point.element.style.left = `${point.x}px`;
                point.element.style.top = `${point.y}px`;
            });
    
            requestAnimationFrame(movePoints);
        }
    
        movePoints();
    });
    }

function Points3(){
        document.addEventListener("DOMContentLoaded", () => {
            const container = document.getElementById('container');
            const points = [];
            const numPoints = 80; // Total de pontos
        
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
                if(puzzleDone == true){
                    point.style.background = "#119822";
                }else {
                    point.style.background = "#E30613";
                }
        
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
        
                    // Atualiza a posição do elemento ponto
                    point.element.style.left = `${point.x}px`;
                    point.element.style.top = `${point.y}px`;
                });
        
                requestAnimationFrame(movePoints);
            }
        
            movePoints();
        });
}
    

function getRandomDirection() {
    const speed = 1.5;
    const angle = Math.random() * 2 * Math.PI; 
    return {
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed
    };
}

const images = [
    {element: document.getElementById('img1'), x: 800, y: 50, ...getRandomDirection(), url: 'room1.html'},
    {element: document.getElementById('img2'), x: 400, y: 500, ...getRandomDirection(), url: 'room2.html'},
    {element: document.getElementById('img3'), x: 1100, y: 150, ...getRandomDirection(), url: 'slidingPuzzle.html'},
];

images.forEach(img => {
    img.element.style.position = 'absolute';
    img.element.style.left = img.x + 'px';
    img.element.style.top = img.y + 'px';
    img.element.addEventListener('click', () => {
        window.location.href = img.url;
    });
});

function updatePosition() {
    images.forEach(img => {
        const nextX = img.x + img.dx;
        const nextY = img.y + img.dy;

        if (nextX <= 0 || nextX + img.element.width >= window.innerWidth) {
            img.dx *= -1;
        }
        if (nextY <= 0 || nextY + img.element.height >= window.innerHeight) {
            img.dy *= -1;
        }

        img.x += img.dx;
        img.y += img.dy;

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

                    img.x += img.dx;
                    img.y += img.dy;
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

Points1();
Points2();
Points3();
animate(); 
 