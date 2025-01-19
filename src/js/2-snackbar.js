import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const delay = parseInt(event.target.delay.value);
  const state = event.target.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.show({
        backgroundColor: '#65E765',
        messageColor: 'white',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        transitionIn: 'fadeInDown',
      });
    })
    .catch(delay => {
      iziToast.show({
        backgroundColor: '#FF7074',
        messageColor: 'white',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        transitionIn: 'fadeInDown',
      });
    });
  form.reset();
});
