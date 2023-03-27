$(".first").owlCarousel({
  loop: true,
  margin: 20,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
      nav: false,
    },
    600: {
      items: 3,
      nav: false,
    },
    1000: {
      items: 5,
      nav: false,
      loop: true,
    },
  },
});

$(".second").owlCarousel({
  loop: true,
  margin: 20,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
      nav: false,
    },
    1000: {
      items: 3,
      nav: false,
      loop: true,
    },
  },
});

// Usage example
// setInterval(function () {
//   var value = oscillate(0, 100, 0.01); // Oscillate between 0 and 100 with a speed of 0.01
//   console.log(value);
// }, 16); // Update every 16ms (approx. 60fps)

let hearts = document.querySelectorAll(".heart");
let button = document.getElementById("close-btn");
let navbar = document.getElementById("navbar");
let days = document.getElementById("days");
let hours = document.getElementById("hours");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
let target_date = new Date("04/01/2023");
let expired = document.querySelector(".expired");

const getDifference = () => {
  let current = new Date();
  let diffence = target_date - current;
  let days = 0,
    minutes = 0,
    hours = 0,
    seconds = 0;
  let done = diffence < 0;
  if (!done) {
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = oneDay / 24;
    const oneMinute = oneHour / 60;
    const oneSecond = oneMinute / 60;
    days = parseInt(diffence / oneDay);
    diffence -= days * oneDay;
    hours = parseInt(diffence / oneHour);
    diffence -= hours * oneHour;
    minutes = parseInt(diffence / oneMinute);
    diffence -= minutes * oneMinute;
    seconds = parseInt(diffence / oneSecond);
    diffence -= seconds * oneSecond;
    // let newDate = new Date(diffence);
    // days = newDate.get();
    // hours = newDate.getHours();
    // minutes = newDate.getMinutes();
    // seconds = newDate.getSeconds();
  }
  return { days, hours, minutes, seconds, done };
};

let delays = [0, 0, 0, 0, 0, 0, 0, 0, 0];
const makeHeartsRun = () => {
  hearts.forEach((element, index) => {
    let rng = Math.random();

    if (delays[index] == 0) {
      if (element.style.top != "") {
        let top = parseInt(element.style.top.match(/\d+/).pop());
        let rotation = parseInt(element.style.transform.match(/\d+/).pop());
        if (top > 0) {
          top -= rng + 1;
          rotation += 10;
          element.style.top = top + "%";
          element.style.opacity = top * 2 + "%";
          element.style.transform = `rotate(${rotation}deg)`;
        } else {
          delays[index] = parseInt(rng * 10 + 1);
          element.style.top = "";
        }
      } else {
        element.style.top = "45%";
        element.style.scale = rng * 0.5 + 0.5;
        element.style.left = rng * 10 + 40 + "%";
        element.style.transform = `rotate(${rng * 10}deg)`;
      }
    } else {
      delays[index]--;
    }
  });
};

let oneSecond = 0;
setInterval(() => {
  if (++oneSecond === 10) {
    let date = getDifference();
    days.textContent = date.days;
    hours.textContent = date.hours;
    minutes.textContent = date.minutes;
    seconds.textContent = date.seconds;
    if (date.done) {
      expired.style.display = "block";
      days.style.display = "none";
      hours.style.display = "none";
      minutes.style.display = "none";
      seconds.style.display = "none";
    } else {
      expired.style.display = "none";
      days.style.display = "block";
      hours.style.display = "block";
      minutes.style.display = "block";
      seconds.style.display = "block";
    }
    oneSecond = 0;
  }

  makeHeartsRun();
}, 100);

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("active");
  } else {
    navbar.classList.remove("active");
  }
});
button.addEventListener("click", () => {
  if (button.classList.contains("active")) {
    button.classList.remove("active");
  } else {
    navbar.classList.add("active");
    button.classList.add("active");
  }
});
