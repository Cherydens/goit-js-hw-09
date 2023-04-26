import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';

const startBtn = document.querySelector('button[data-start]');
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');

startBtn.addEventListener('click', onStartBtnClick);
startBtn.disabled = true;

const PROMPT_DELAY = 1000;

let remainingTime = 0;
let targetTime = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    targetTime = selectedDates[0];
    if (targetTime < Date.now()) {
      startBtn.disabled = true;
      Notify.failure('Please choose a date in the future');
      return;
    }
    startBtn.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

function onStartBtnClick() {
  startBtn.disabled = true;

  remainingTime = targetTime - Date.now();
  if (remainingTime <= 0) {
    Notify.failure('Please choose a date in the future');
    return;
  }

  showTime();

  intervalId = setInterval(() => {
    remainingTime = targetTime - Date.now();
    if (remainingTime <= 0) {
      Report.success('Timer finished!', 'Select new target time');
      clearInterval(intervalId);
      return;
    }
    showTime();
  }, PROMPT_DELAY);
}

function showTime() {
  const { days, hours, minutes, seconds } = convertMs(remainingTime);
  daysField.textContent = addLeadingZero(days);
  hoursField.textContent = addLeadingZero(hours);
  minutesField.textContent = addLeadingZero(minutes);
  secondsField.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
