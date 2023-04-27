import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('form.form');

form.addEventListener('submit', onSubmit);

const params = {};

function onSubmit(evt) {
  evt.preventDefault();
  makeParams(evt);
  createPromisesChain();
}

function makeParams(evt) {
  const formData = new FormData(evt.currentTarget);
  formData.forEach((value, key) => {
    params[key] = +value;
  });
}

function createPromisesChain() {
  for (let i = 1; i <= params.amount; i += 1) {
    createPromise(i, params.delay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    params.delay += params.step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
