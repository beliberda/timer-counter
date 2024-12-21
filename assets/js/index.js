const timerDisplay = document.getElementById('timer');
const totalTimeInput = document.getElementById('total-time');
const alertTimeInput = document.getElementById('alert-time');
const finalSecondsInput = document.getElementById('final-seconds');
const startButton = document.getElementById('start-timer');
const stopButton = document.getElementById('stop-timer');
const alertSound = document.getElementById('alert-sound');
const finalSound = document.getElementById('final-sound');
const finalStopSound = document.getElementById('final-stop');

let countdownInterval;
let repeatCount = 0;
const maxRepeats = 10;
const intervalRepeat = 5
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function startCountdown() {
    clearInterval(countdownInterval);

    let totalTime = parseInt(totalTimeInput.value, 10);
    const alertTime = parseInt(alertTimeInput.value, 10);
    const finalSeconds = parseInt(finalSecondsInput.value, 10);

    timerDisplay.textContent = formatTime(totalTime);

    countdownInterval = setInterval(() => {
        totalTime--;
        timerDisplay.textContent = formatTime(totalTime);

        if (totalTime === alertTime) {
            alertSound.play();
        }

        if (totalTime <= finalSeconds && totalTime > 0) {
            finalSound.play();
        }

        if (totalTime <= 0) {
            finalStopSound.play()
            clearInterval(countdownInterval);
            repeatCount++;

            if (repeatCount < maxRepeats) {
                setTimeout(() => {
                    startCountdown();
                }, intervalRepeat * 1000);
            } else {
                timerDisplay.textContent = "Time's up!";
            }
        }
    }, 1000);
}

startButton.addEventListener('click', () => {
    repeatCount = 0;
    startCountdown();
});
stopButton.addEventListener('click', () => {
    repeatCount = 0;
    finalSound.pause()
    finalSound.currentTime = 0
    alertSound.pause()
    alertSound.currentTime = 0
    finalStopSound.pause()
    finalStopSound.currentTime = 0
    clearInterval(countdownInterval)
});
