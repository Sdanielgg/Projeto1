        // Função para formatar o tempo em milissegundos no formato MM:SS
        function formatTime(ms) {
            const totalSeconds = Math.floor(ms / 1000);
            const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
            const seconds = String(totalSeconds % 60).padStart(2, '0');
            return `${minutes}:${seconds}`;
        }

        // Obter tempo decorrido do localStorage
        document.addEventListener('DOMContentLoaded', () => {
            const elapsedTime = localStorage.getItem('elapsedTime');
            console.log(elapsedTime%100)
            console.log((elapsedTime-elapsedTime%1000)/1000)
            const timeInMilliseconds = elapsedTime ? parseInt(elapsedTime, 10) : 0;
            document.getElementById('time').textContent = formatTime(timeInMilliseconds);
        });

        // Funções de botão
        function restartGame() {
            window.location.href = "intro.html";
        }

        function goToMenu() {
            window.location.href = "../main.html";
        }

        
function Points(){

    document.addEventListener("DOMContentLoaded", () => {
        const container = document.getElementById('container');
        const points = [];
        const numPoints = 60; // Total de pontos
    
    
        // Função para gerar um número aleatório entre min e max
        function getRandom(min, max) {
            return Math.random() * (max - min) + min;
        }
    
    
        // Cria pontos com posições e direções aleatórias
        for (let i = 0; i < numPoints; i++) {
            const point = document.createElement('div');
            point.classList.add('point');
            container.appendChild(point);
                point.style.background = "#119822";
    
            points.push({
                element: point,
                x: getRandom(0, window.innerWidth - 20),
                y: getRandom(0, window.innerHeight - 20),
                dx: getRandom(-3, 3), // para que dx n seja 0
                dy: getRandom(-3, 3)   // para que dy n seja 0
            });
        }
    
        function movePoints() {
            points.forEach(point => {
                // Move o ponto
                point.x += point.dx;
                point.y += point.dy;
    
                // Verifica coliso com as bordas do contêiner
                if (point.x <= 0 || point.x >= window.innerWidth - 20) {
                    point.dx *= -1; // Inverte a direção no eixo x
                }
                if (point.y <= 0 || point.y >= window.innerHeight - 20) {
                    point.dy *= -1; // Inverte a direçao no eixo y
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
    // 
    function bestTime(){
        let users = JSON.parse(localStorage.getItem("users")) || [];
        const userIndex = users.findIndex(u => u.status === "active");
        if (userIndex!=-1){
            const elapsedTime = localStorage.getItem('elapsedTime');
            let totalSeconds=((elapsedTime-elapsedTime%1000)/1000)
            console.log(totalSeconds)

            if (users[userIndex].escapeRoomTime>totalSeconds){
                users[userIndex].escapeRoomTime=totalSeconds
                localStorage.setItem("users", JSON.stringify(users));

        }
        }else{
            console.error("ERROR USER IS NOT LOGGED IN")
        }

    }
    bestTime()
    Points();
