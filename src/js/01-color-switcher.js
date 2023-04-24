const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

const PROMPT_DELAY = 1000;

let isActive = false;
let intervalId = null;

btnState();

function onStartBtnClick() {
  switchBodyColor();
  isActive = true;
  btnState();
}

function onStopBtnClick() {
  clearInterval(intervalId);
  isActive = false;
  btnState();
}

function switchBodyColor() {
  setBodyColor();
  intervalId = setInterval(() => {
    setBodyColor();
  }, PROMPT_DELAY);
}

function setBodyColor() {
  body.style.backgroundColor = getRandomHexColor();
}

function btnState() {
  stopBtn.disabled = !isActive;
  startBtn.disabled = isActive;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
