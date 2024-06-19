const player = document.getElementById('player');
const enemy = document.getElementById('enemy');
const playerHealthBar = document.getElementById('player-health');
const enemyHealthBar = document.getElementById('enemy-health');
let playerPosition = { x: window.innerWidth / 2, y: window.innerHeight - 70 };
let enemyPosition = { x: Math.random() * window.innerWidth, y: 20 };
let playerHealth = 50;
let enemyHealth = 1000;
let playerSpeed = 2;
let enemySpeed = 0.5;
let keys = {};
let shooting = false;
let lastPlayerShotTime = 0;
let lastEnemyShotTime = 0;
let lastEnemyConeShotTime = 0;
let lastEnemyCircleShotTime = 0;
const playerFireRate = 500; // 2 tiros por segundo (1000ms / 2)
const enemyFireRate = 800; // 3 tiros por segundo (1000ms / 3)
const enemyConeFireInterval = 10000; // Disparo em cone a cada 10 segundos
const enemyCircleFireInterval = 2000; // Disparo em círculo a cada 2 segundos
const playerProjectileSpeed = 11; // Velocidade do projétil do jogador
const enemyProjectileSpeed = 8; // Velocidade do projétil do inimigo
let enemyExploded = false;

function updatePlayerPosition() {
    player.style.left = `${playerPosition.x}px`;
    player.style.top = `${playerPosition.y}px`;
}

function updateEnemyPosition() {
    enemy.style.left = `${enemyPosition.x}px`;
    enemy.style.top = `${enemyPosition.y}px`;
}

document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});

document.addEventListener('mousedown', () => {
    shooting = true;
});

document.addEventListener('mouseup', () => {
    shooting = false;
});

function movePlayer() {
    if (keys['w'] || keys['ArrowUp']) playerPosition.y -= playerSpeed;
    if (keys['s'] || keys['ArrowDown']) playerPosition.y += playerSpeed;
    if (keys['a'] || keys['ArrowLeft']) playerPosition.x -= playerSpeed;
    if (keys['d'] || keys['ArrowRight']) playerPosition.x += playerSpeed;
    if (playerPosition.x < 0) playerPosition.x = 0;
    if (playerPosition.x > window.innerWidth - 50) playerPosition.x = window.innerWidth - 50;
    if (playerPosition.y < 0) playerPosition.y = 0;
    if (playerPosition.y > window.innerHeight - 50) playerPosition.y = window.innerHeight - 50;
    updatePlayerPosition();
}

let shot = 1;

function shootProjectile(targetX, targetY) {
    const projectile = document.createElement('div');
    if (shot == 1) {
        projectile.className = 'projectile1';
        shot = 2;
    } else if (shot == 2) {
        projectile.className = 'projectile2';
        shot = 3;
    } else if (shot == 3) {
        projectile.className = 'projectile3';
        shot = 1;
    }
    projectile.style.left = `${playerPosition.x + 20}px`;
    projectile.style.top = `${playerPosition.y + 20}px`;
    document.body.appendChild(projectile);

    const angle = Math.atan2(targetY - (playerPosition.y + 20), targetX - (playerPosition.x + 20));
    const velocity = { x: Math.cos(angle) * playerProjectileSpeed, y: Math.sin(angle) * playerProjectileSpeed };

    let projectileInterval = setInterval(() => {
        projectile.style.left = `${projectile.offsetLeft + velocity.x}px`;
        projectile.style.top = `${projectile.offsetTop + velocity.y}px`;

        if (projectile.offsetTop > window.innerHeight || projectile.offsetTop < 0 || projectile.offsetLeft > window.innerWidth || projectile.offsetLeft < 0) {
            clearInterval(projectileInterval);
            projectile.remove();
        }

        if (checkCollision(projectile, enemy)) {
            enemyHealth -= 10;
            enemyHealthBar.style.width = `${(enemyHealth / 10)}%`;
            clearInterval(projectileInterval);
            projectile.remove();

            if (enemyHealth <= 0 && !enemyExploded) {
                enemyExploded = true;
                trembleAndExplodeEnemy();
            }
        }
    }, 20);
}

function handleShooting(event) {
    const currentTime = new Date().getTime();
    if (shooting && currentTime - lastPlayerShotTime > playerFireRate) {
        shootProjectile(event.clientX, event.clientY);
        lastPlayerShotTime = currentTime;
    }
}

document.addEventListener('mousemove', (event) => {
    if (shooting) {
        handleShooting(event);
    }
});

function checkCollision(projectile, target) {
    const pRect = projectile.getBoundingClientRect();
    const tRect = target.getBoundingClientRect();

    return !(
        pRect.top > tRect.bottom ||
        pRect.bottom < tRect.top ||
        pRect.left > tRect.right ||
        pRect.right < tRect.left
    );
}

function moveEnemy() {
    const angle = Math.atan2(playerPosition.y - enemyPosition.y, playerPosition.x - enemyPosition.x);
    enemyPosition.x += Math.cos(angle) * enemySpeed;
    enemyPosition.y += Math.sin(angle) * enemySpeed;

    updateEnemyPosition();

    const currentTime = new Date().getTime();
    if (currentTime - lastEnemyShotTime > enemyFireRate) {
        shootEnemyProjectile();
        lastEnemyShotTime = currentTime;
    }

    if (currentTime - lastEnemyConeShotTime > enemyConeFireInterval) {
        shootEnemyConeProjectiles();
        lastEnemyConeShotTime = currentTime;
    }

    if (enemyHealth <= 500 && currentTime - lastEnemyCircleShotTime > enemyCircleFireInterval) {
        shootEnemyCircleProjectiles();
        lastEnemyCircleShotTime = currentTime;
    }
}

function shootEnemyProjectile() {
    const projectile = document.createElement('div');
    projectile.className = 'enemy-projectile';
    projectile.style.left = `${enemy.offsetLeft + 20}px`;
    projectile.style.top = `${enemy.offsetTop + 20}px`;
    document.body.appendChild(projectile);

    const angle = Math.atan2(playerPosition.y - projectile.offsetTop, playerPosition.x - projectile.offsetLeft);
    const velocity = { x: Math.cos(angle) * enemyProjectileSpeed, y: Math.sin(angle) * enemyProjectileSpeed };

    let projectileInterval = setInterval(() => {
        projectile.style.left = `${projectile.offsetLeft + velocity.x}px`;
        projectile.style.top = `${projectile.offsetTop + velocity.y}px`;

        if (projectile.offsetTop > window.innerHeight || projectile.offsetTop < 0 || projectile.offsetLeft > window.innerWidth || projectile.offsetLeft < 0) {
            clearInterval(projectileInterval);
            projectile.remove();
        }

        if (checkCollision(projectile, player)) {
            playerHealth -= 10;
            playerHealthBar.style.width = `${playerHealth}%`;
            clearInterval(projectileInterval);
            projectile.remove();

            if (playerHealth <= 0) {
                window.location.href = 'GameOver.html';
            }
        }
    }, 20);
}

function shootEnemyConeProjectiles() {
    const angles = [-0.2, 0, 0.2]; // Três ângulos para o cone

    angles.forEach(offset => {
        const projectile = document.createElement('div');
        projectile.className = 'enemy-projectile';
        projectile.style.left = `${enemy.offsetLeft + 20}px`;
        projectile.style.top = `${enemy.offsetTop + 20}px`;
        document.body.appendChild(projectile);

        const angle = Math.atan2(playerPosition.y - projectile.offsetTop, playerPosition.x - projectile.offsetLeft) + offset;
        const velocity = { x: Math.cos(angle) * enemyProjectileSpeed, y: Math.sin(angle) * enemyProjectileSpeed };

        let projectileInterval = setInterval(() => {
            projectile.style.left = `${projectile.offsetLeft + velocity.x}px`;
            projectile.style.top = `${projectile.offsetTop + velocity.y}px`;

            if (projectile.offsetTop > window.innerHeight || projectile.offsetTop < 0 || projectile.offsetLeft > window.innerWidth || projectile.offsetLeft < 0) {
                clearInterval(projectileInterval);
                projectile.remove();
            }

            if (checkCollision(projectile, player)) {
                playerHealth -= 10;
                playerHealthBar.style.width = `${playerHealth}%`;
                clearInterval(projectileInterval);
                projectile.remove();

                if (playerHealth <= 0) {
                    window.location.href = 'GameOver.html';
                }
            }
        }, 20);
    });
}

function shootEnemyCircleProjectiles() {
    const totalProjectiles = 10;
    for (let i = 0; i < totalProjectiles; i++) {
        const projectile = document.createElement('div');
        projectile.className = 'enemy-projectile';
        projectile.style.left = `${enemy.offsetLeft + 20}px`;
        projectile.style.top = `${enemy.offsetTop + 20}px`;
        document.body.appendChild(projectile);

        const angle = (2 * Math.PI / totalProjectiles) * i; // Ângulo para cada projétil
        const velocity = { x: Math.cos(angle) * enemyProjectileSpeed, y: Math.sin(angle) * enemyProjectileSpeed };

        let projectileInterval = setInterval(() => {
            projectile.style.left = `${projectile.offsetLeft + velocity.x}px`;
            projectile.style.top = `${projectile.offsetTop + velocity.y}px`;

            if (projectile.offsetTop > window.innerHeight || projectile.offsetTop < 0 || projectile.offsetLeft > window.innerWidth || projectile.offsetLeft < 0) {
                clearInterval(projectileInterval);
                projectile.remove();
            }

            if (checkCollision(projectile, player)) {
                playerHealth -= 10;
                playerHealthBar.style.width = `${playerHealth}%`;
                clearInterval(projectileInterval);
                projectile.remove();

                if (playerHealth <= 0) {
                    window.location.href = 'GameOver.html';
                }
            }
        }, 20);
    }
}

function trembleAndExplodeEnemy() {
    let trembleCount = 0;
    const trembleDuration = 3000; 
    const trembleInterval = 50; 
    const trembleMagnitude = 5; 

    const initialPosition = { x: enemyPosition.x, y: enemyPosition.y };

    let trembleIntervalId = setInterval(() => {
        trembleCount += trembleInterval;
        enemyPosition.x = initialPosition.x + (Math.random() - 0.5) * trembleMagnitude;
        enemyPosition.y = initialPosition.y + (Math.random() - 0.5) * trembleMagnitude;
        updateEnemyPosition();

        if (trembleCount >= trembleDuration) {
            clearInterval(trembleIntervalId);
            shootFinalExplosion();
            enemy.remove();
            setTimeout(function() {
                window.location.href = 'winDialog.html';
            
        }, 2000);
        }
    }, trembleInterval);
}

function shootFinalExplosion() {
    const totalProjectiles = 100;
    for (let i = 0; i < totalProjectiles; i++) {
        const projectile = document.createElement('div');
        projectile.className = 'enemy-projectile';
        projectile.style.left = `${enemy.offsetLeft + 20}px`;
        projectile.style.top = `${enemy.offsetTop + 20}px`;
        document.body.appendChild(projectile);

        const angle = (2 * Math.PI / totalProjectiles) * i; 
        const velocity = { x: Math.cos(angle) * enemyProjectileSpeed, y: Math.sin(angle) * enemyProjectileSpeed };

        let projectileInterval = setInterval(() => {
            projectile.style.left = `${projectile.offsetLeft + velocity.x}px`;
            projectile.style.top = `${projectile.offsetTop + velocity.y}px`;

            if (projectile.offsetTop > window.innerHeight || projectile.offsetTop < 0 || projectile.offsetLeft > window.innerWidth || projectile.offsetLeft < 0) {
                clearInterval(projectileInterval);
                projectile.remove();
            }

            if (checkCollision(projectile, player)) {
                playerHealth -= 10;
                playerHealthBar.style.width = `${playerHealth}%`;
                clearInterval(projectileInterval);
                projectile.remove();

                if (playerHealth <= 0) {
                    window.location.href = 'GameOver.html';
                }
            }
        }, 20);
    }
}

function gameLoop() {
    movePlayer();
    if (!enemyExploded) {
        moveEnemy();
    }
    requestAnimationFrame(gameLoop);
}

updatePlayerPosition();
updateEnemyPosition();
gameLoop();
