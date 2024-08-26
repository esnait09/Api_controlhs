let timerInterval;
let seconds = 0;
let isRunning = false;  // Variable para controlar el estado del temporizador

function formatTime(sec) {
    const hrs = String(Math.floor(sec / 3600)).padStart(2, '0');
    const mins = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
    const secs = String(sec % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
}

function startTimer() {
    if (isRunning) return;  // Evita iniciar múltiples intervalos
    isRunning = true;
    timerInterval = setInterval(() => {
        seconds++;
        document.querySelector('.cronometro').textContent = formatTime(seconds);
    }, 1000);
    toggleButtons(true);
}

function stopTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    toggleButtons(false);
}

function increaseHour() {
    if (isRunning) return;  // No permite aumentar la hora mientras el temporizador está en marcha
    seconds += 0;
    const formattedTime = formatTime(seconds);
    document.querySelector('.cronometro').textContent = formattedTime;
    document.getElementById('Horas_Diarias_Realizadas').value = formattedTime;  // Actualiza el campo de entrada
}

function toggleButtons(disable) {
    document.getElementById('Comenzar').disabled = disable;
    document.getElementById('Parar').disabled = !disable;
    document.getElementById('Cargar_hora').disabled = disable;
}

document.getElementById('Comenzar').addEventListener('click', startTimer);
document.getElementById('Parar').addEventListener('click', stopTimer);
document.getElementById('Cargar_hora').addEventListener('click', increaseHour);

// Inicialmente, el botón de parar y aumentar la hora están deshabilitados
toggleButtons(false);
