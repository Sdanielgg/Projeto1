let timer;
let startTime;
let elapsedTime = 0;

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
}

function updateTimer() {
    const now = Date.now();
    elapsedTime = now - startTime;
    document.getElementById('timer').textContent = formatTime(elapsedTime);
}

function startTimer() {
    if (localStorage.getItem('startTime')) {
        startTime = Number(localStorage.getItem('startTime'));
    } else {
        startTime = Date.now();
        localStorage.setItem('startTime', startTime);
    }
    if (localStorage.getItem('elapsedTime')) {
        elapsedTime = Number(localStorage.getItem('elapsedTime'));
        startTime = Date.now() - elapsedTime;
    }
    timer = setInterval(updateTimer, 1000);
}

function stopTimer() {
    clearInterval(timer);
    localStorage.setItem('elapsedTime', elapsedTime);
    localStorage.setItem('startTime', startTime);
}

function resetTimer() {
    clearInterval(timer);
    elapsedTime = 0;
    startTime = Date.now();
    localStorage.setItem('startTime', startTime);
    localStorage.setItem('elapsedTime', elapsedTime);
    document.getElementById('timer').textContent = formatTime(elapsedTime);
    startTimer();
}

window.addEventListener('load', () => {
    startTimer();
});

window.addEventListener('beforeunload', () => {
    stopTimer();
});
