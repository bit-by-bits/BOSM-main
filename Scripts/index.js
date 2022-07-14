const bosm = new Date("October 15, 2022 23:59:59").getTime();
const stars_cont = document.getElementById("stars-cont");
let prev_days, prev_hrs, prev_min, days, hrs, min;

let count = setInterval(() => {
  const current_time = new Date().getTime();

  // updating number of days left
  days = Math.floor((bosm - current_time) / (1000 * 60 * 60 * 24));
  days = days < 10 ? `0${days}` : days;

  // updating number of hours left (in that day)
  hrs = Math.floor((bosm - current_time) / (1000 * 60 * 60)) - days * 24;
  hrs = hrs < 10 ? `0${hrs}` : hrs;

  // updating number of minutes left (in that hour)
  min =
    Math.floor((bosm - current_time) / (1000 * 60)) - days * 24 * 60 - hrs * 60;
  min = min < 10 ? `0${min}` : min;

  // when timer is completed (BOSM arrives)
  if (days < 0) {
    days = "00";
    hrs = "00";
    min = "00";
  }

  // adding animation to timer cards
  document.getElementById("days").style.animation =
    prev_days != days ? "card-flip 0.6s" : "none";
  document.getElementById("hours").style.animation =
    prev_hrs != hrs ? "card-flip 0.6s" : "none";
  document.getElementById("mins").style.animation =
    prev_min != min ? "card-flip 0.6s" : "none";

  // updating the temporary variables
  prev_days = days;
  prev_hrs = hrs;
  prev_min = min;

  // updating the divs
  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hrs;
  document.getElementById("mins").innerHTML = min;
}, 2000);

// Stars spawning randomly

let stars = "";
const star_count_factor = Math.random() * 0.1 + 0.2;
let window_height = window.innerHeight;
let window_width = window.innerWidth;
let star_count = (window_height * window_width * star_count_factor) / 1000;
const add_stars = () => {
  stars = "";
  for (let i = 0; i < star_count; i++) {
    let class_int = Math.random();
    let offset_x = Math.random() * 0.9 + 0.05;
    let offset_y = Math.random() * 0.9 + 0.05;
    if (class_int < 0.5) {
      stars = `${stars}\n
<div class="star-type1 star" style="left: ${offset_x * window_width}px; top: ${
        offset_y * window_height
      }px"></div>`;
    } else {
      stars = `${stars}\n
<div class="star-type2 star" style="left: ${offset_x * window_width}px; top: ${
        offset_y * window_height
      }px"></div>`;
    }
  }

  stars_cont.innerHTML = stars;
};

add_stars();
