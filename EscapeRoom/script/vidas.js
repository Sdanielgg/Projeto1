let lives;

document.addEventListener('DOMContentLoaded', (event) => {
    // Check if lives are stored in localStorage
    lives = localStorage.getItem('lives');
    if (lives === null) {
        lives = 3;
    } else {
        lives = parseInt(lives, 10);
    }
    updateLivesDisplay();
});

function loseLife() {
    if (lives > 0) {
        const lifeImg = document.getElementById(`life${lives}`);
        lifeImg.style.filter = 'grayscale(100%)';
        lives--;
        localStorage.setItem('lives', lives);

        // Shake the screen
        document.body.classList.add('shake');
        setTimeout(() => {
            document.body.classList.remove('shake');
        }, 500);
    }
}

function updateLivesDisplay() {
    for (let i = 1; i <= 3; i++) {
        const lifeImg = document.getElementById(`life${i}`);
        if (i > lives) {
            lifeImg.style.filter = 'grayscale(100%)';
        } else {
            lifeImg.style.filter = 'none';
        }
    }
}
