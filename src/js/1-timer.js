import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datetimePicker = document.querySelector('#datetime-picker');

let userSelectedDate;
let timerInterval;

document.querySelector('[data-start]').disabled = true;

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let currentDate = new Date();
    userSelectedDate = selectedDates[0];
    if (userSelectedDate <= currentDate) {
      iziToast.error({
        id: 'error',
        message: 'Please select date in the future',
        position: 'topRight',
        transitionIn: 'fadeInDown',
      });
      document.querySelector('[data-start]').disabled = true;
    } else {
      document.querySelector('[data-start]').disabled = false;
    }
  },
};

flatpickr(datetimePicker, options);

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

function updateTimer() {
  const now = new Date();
  const timeDifference = userSelectedDate - now;

  if (timeDifference <= 0) {
    clearInterval(timerInterval);
    datetimePicker.disabled = false;
    document.querySelector('[data-start]').disabled = true;
    document.querySelector('[data-days]').textContent = '00';
    document.querySelector('[data-hours]').textContent = '00';
    document.querySelector('[data-minutes]').textContent = '00';
    document.querySelector('[data-seconds]').textContent = '00';
    return;
  }

  const time = convertMs(timeDifference);
  document.querySelector('[data-days]').textContent = time.days;
  document.querySelector('[data-hours]').textContent = addLeadingZero(
    time.hours
  );
  document.querySelector('[data-minutes]').textContent = addLeadingZero(
    time.minutes
  );
  document.querySelector('[data-seconds]').textContent = addLeadingZero(
    time.seconds
  );
}

document.querySelector('[data-start]').addEventListener('click', function () {
  datetimePicker.disabled = true;
  document.querySelector('[data-start]').disabled = true;

  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
});
