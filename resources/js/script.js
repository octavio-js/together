const startDate = new Date("2025-03-18T23:41:00");

const timeElements = {
    years: document.querySelector('#years .digit'),
    months: document.querySelector('#months .digit'),
    weeks: document.querySelector('#weeks .digit'),
    days: document.querySelector('#days .digit'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
};

function updateTimer() {
    const now = new Date();
    const diffInMs = now - startDate;
    const totalSeconds = Math.floor(diffInMs / 1000);

    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor((totalSeconds / 60) % 60);
    const hours = Math.floor((totalSeconds / 3600) % 24);
    const days = Math.floor(totalSeconds / 86400);
    const weeks = Math.floor(totalSeconds / 604800);

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let dayDifference = now.getDate() - startDate.getDate();

    // Check if the time threshold has been crossed
    if (now.getFullYear() === startDate.getFullYear() &&
        now.getMonth() === startDate.getMonth() &&
        now.getDate() === startDate.getDate()) {
        if (now.getHours() < startDate.getHours() ||
            (now.getHours() === startDate.getHours() && now.getMinutes() < startDate.getMinutes())) {
            dayDifference = 0;
        }
    } else {
      if(now.getHours() < startDate.getHours() || (now.getHours() === startDate.getHours() && now.getMinutes() < startDate.getMinutes())){
        dayDifference--;
      }
    }

    if (dayDifference < 0) {
        const previousMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        dayDifference += previousMonthLastDay;
        months--;
    }

    if (months < 0) {
        months += 12;
        years--;
    }

    timeElements.years.textContent = years;
    timeElements.months.textContent = months;
    timeElements.weeks.textContent = weeks;
    timeElements.days.textContent = dayDifference;
    timeElements.hours.textContent = String(hours).padStart(2, '0');
    timeElements.minutes.textContent = String(minutes).padStart(2, '0');
    timeElements.seconds.textContent = String(seconds).padStart(2, '0');
}

setInterval(updateTimer, 1000);
updateTimer();