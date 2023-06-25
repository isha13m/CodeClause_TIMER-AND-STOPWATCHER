// Timer
const timerMinutesInput = document.getElementById('timer-minutes');
const timerSecondsInput = document.getElementById('timer-seconds');
const timerStartBtn = document.getElementById('timer-start');
const timerStopBtn = document.getElementById('timer-stop');
const timerResetBtn = document.getElementById('timer-reset');
const timerDisplay = document.getElementById('timer-display');

let timerIntervalId;

function startTimer() {
  let minutes = parseInt(timerMinutesInput.value) || 0;
  let seconds = parseInt(timerSecondsInput.value) || 0;

  if (minutes === 0 && seconds === 0) {
    return;
  }

  timerStartBtn.disabled = true;
  timerMinutesInput.disabled = true;
  timerSecondsInput.disabled = true;

  timerIntervalId = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        stopTimer();
        return;
      }
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }

    timerDisplay.innerText = `${padZero(minutes)}:${padZero(seconds)}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerIntervalId);
  timerStartBtn.disabled = false;
  timerMinutesInput.disabled = false;
  timerSecondsInput.disabled = false;
}

function resetTimer() {
  clearInterval(timerIntervalId);
  timerDisplay.innerText = '00:00';
  timerStartBtn.disabled = false;
  timerMinutesInput.disabled = false;
  timerSecondsInput.disabled = false;
  timerMinutesInput.value = '';
  timerSecondsInput.value = '';
}

// Stopwatch
const stopwatchStartBtn = document.getElementById('stopwatch-start');
const stopwatchStopBtn = document.getElementById('stopwatch-stop');
const stopwatchResetBtn = document.getElementById('stopwatch-reset');
const stopwatchDisplay = document.getElementById('stopwatch-display');

let stopwatchIntervalId;
let stopwatchMilliseconds = 0;

function startStopwatch() {
  stopwatchStartBtn.disabled = true;

  stopwatchIntervalId = setInterval(() => {
    stopwatchMilliseconds += 10;
    const time = new Date(stopwatchMilliseconds);
    const minutes = padZero(time.getUTCMinutes());
    const seconds = padZero(time.getUTCSeconds());
    const milliseconds = padZero(Math.floor(time.getUTCMilliseconds() / 10));

    stopwatchDisplay.innerText = `${minutes}:${seconds}:${milliseconds}`;
  }, 10);
}

function stopStopwatch() {
  clearInterval(stopwatchIntervalId);
  stopwatchStartBtn.disabled = false;
}

function resetStopwatch() {
  clearInterval(stopwatchIntervalId);
  stopwatchDisplay.innerText = '00:00:00';
  stopwatchStartBtn.disabled = false;
  stopwatchMilliseconds = 0;
}

// Helper function to pad zero for single-digit numbers
function padZero(num) {
  return num.toString().padStart(2, '0');
}

// Event listeners
timerStartBtn.addEventListener('click', startTimer);
timerStopBtn.addEventListener('click', stopTimer);
timerResetBtn.addEventListener('click', resetTimer);
stopwatchStartBtn.addEventListener('click', startStopwatch);
stopwatchStopBtn.addEventListener('click', stopStopwatch);
stopwatchResetBtn.addEventListener('click', resetStopwatch);
