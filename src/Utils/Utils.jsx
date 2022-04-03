import React from "react";

let now = new Date();
function Time({ ttime }) {
  let hours = now.getHours();
  let minutes = now.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let ampm = hours > 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;

  return (
    <p className={ttime}>
      {hours}:{minutes}
      {ampm}
    </p>
  );
}

function Today({ ddate }) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let daysofweek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = now.getDate();
  let dayofweek = now.getDay();
  dayofweek = daysofweek[dayofweek];
  let month = now.getMonth();
  month = months[month];
  let year = now.getFullYear();

  function ordinal(i) {
    var j = i % 10,
      k = i % 100;
    if (j === 1 && k !== 11) {
      return i + "st";
    }
    if (j === 2 && k !== 12) {
      return i + "nd";
    }
    if (j === 3 && k !== 13) {
      return i + "rd";
    }
    return i + "th";
  }

  return (
    <p className={ddate}>
      {dayofweek}, {month} {ordinal(day)}
      {/* , {year} */}
    </p>
  );
}

export { Time, Today };
