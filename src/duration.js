/* 
  Returns a string representing the time difference between  
  two dates rounded to the unit precision. 
  Test here: onecompiler.com/javascript or jsfiddle.net/

  Parameters:
    start, end (optional) - js dates, end defaults to now().
    pUnits (optional) - an array of stings that represent the plural unit words. 
      This also controls the precision desired. 
      The order needs to be:
      ['years','months','days','hours','minutes','seconds','milliseconds'].
      Omitting units from the end of the array will omit from the duration
      and round up to that last unit.
    sUnits (optional) - as above but singular of units. Note array length and
      order should be the same as pUnits.
    separator (optional) - separator string of units in the returned string.
    ending (optional) - array that holds the final suffix. Default is ['ago','until']
*/

function duration(
  start,
  end = new Date(),
  pUnits = [
    "years",
    "months",
    "days",
    "hours",
    "minutes",
    "seconds",
    "milliseconds",
  ],
  sUnits = ["year", "month", "day", "hour", "minute", "second", "millisecond"],
  separator = ", ",
  ending = ["ago", "until"]
) {
  // return if pUnits length does not match sUnits length
  if (pUnits.length !== sUnits.length) {
    return "Unit description lengths do not match!";
  }
  let diff = Math.abs(start - end);
  let diffR;
  let suffix = start < end ? ending[0] : ending[1];
  let milliseconds, seconds, minutes, hours, days, months, years;

  years = Math.floor(diff / 1000 / 60 / 60 / 24 / 365);
  diffR = diff - years * 365 * 24 * 60 * 60 * 1000;
  months = Math.floor(diffR / 1000 / 60 / 60 / 24 / 30);

  diffR =
    diff -
    years * 365 * 24 * 60 * 60 * 1000 -
    months * 30 * 24 * 60 * 60 * 1000;
  days = Math.floor(diffR / 1000 / 60 / 60 / 24);

  diffR =
    diff -
    years * 365 * 24 * 60 * 60 * 1000 -
    months * 30 * 24 * 60 * 60 * 1000 -
    days * 24 * 60 * 60 * 1000;
  hours = Math.floor(diffR / 1000 / 60 / 60);

  diffR =
    diff -
    years * 365 * 24 * 60 * 60 * 1000 -
    months * 30 * 24 * 60 * 60 * 1000 -
    days * 24 * 60 * 60 * 1000 -
    hours * 60 * 60 * 1000;
  minutes = Math.floor(diffR / 1000 / 60);

  diffR =
    diff -
    years * 365 * 24 * 60 * 60 * 1000 -
    months * 30 * 24 * 60 * 60 * 1000 -
    days * 24 * 60 * 60 * 1000 -
    hours * 60 * 60 * 1000 -
    minutes * 60 * 1000;
  seconds = Math.floor(diffR / 1000);

  milliseconds =
    diff -
    years * 365 * 24 * 60 * 60 * 1000 -
    months * 30 * 24 * 60 * 60 * 1000 -
    days * 24 * 60 * 60 * 1000 -
    hours * 60 * 60 * 1000 -
    minutes * 60 * 1000 -
    seconds * 1000;

  // rounded up array
  let roundUp = [years, months, days, hours, minutes, seconds, milliseconds];

  if (roundUp[6] > 499) {
    // milliseconds
    roundUp[5] += 1;
    if (roundUp[5] > 59) {
      roundUp[4] += 1;
      roundUp[5] -= 60;
    }
  }
  if (roundUp[5] > 29) {
    // seconds
    roundUp[4] += 1;
    if (roundUp[4] > 59) {
      roundUp[3] += 1;
      roundUp[4] -= 60;
    }
  }
  if (roundUp[4] > 29) {
    // minutes
    roundUp[3] += 1;
    if (roundUp[3] > 23) {
      roundUp[2] += 1;
      roundUp[3] -= 24;
    }
  }
  if (roundUp[3] > 11) {
    // hours
    roundUp[2] += 1;
    if (roundUp[2] > 29) {
      roundUp[1] += 1;
      roundUp[2] -= 30;
    }
  }
  if (roundUp[2] > 14) {
    // days
    roundUp[1] += 1;
    if (roundUp[1] > 11) {
      roundUp[0] += 1;
      roundUp[1] -= 12;
    }
  }
  if (roundUp[1] > 5) {
    // months
    roundUp[0] += 1;
  }
  //console.log(roundUp);

  // round up until the last unit
  for (var i = 0; i < pUnits.length; i++) {
    i === 0 ? (years = roundUp[i]) : "";
    i === 1 ? (months = roundUp[i]) : "";
    i === 2 ? (days = roundUp[i]) : "";
    i === 3 ? (hours = roundUp[i]) : "";
    i === 4 ? (minutes = roundUp[i]) : "";
    i === 5 ? (seconds = roundUp[i]) : "";
  }

  let output = "";
  for (var i = 0; i < pUnits.length; i++) {
    if (i === 0 && years > 0) {
      output += years + " " + (years > 1 ? pUnits[i] : sUnits[i]) + separator;
    }
    if (i === 1 && months > 0) {
      output += months + " " + (months > 1 ? pUnits[i] : sUnits[i]) + separator;
    }
    if (i === 2 && days > 0) {
      output += days + " " + (days > 1 ? pUnits[i] : sUnits[i]) + separator;
    }
    if (i === 3 && hours > 0) {
      output += hours + " " + (hours > 1 ? pUnits[i] : sUnits[i]) + separator;
    }
    if (i === 4 && minutes > 0) {
      output +=
        minutes + " " + (minutes > 1 ? pUnits[i] : sUnits[i]) + separator;
    }
    if (i === 5 && seconds > 0) {
      output +=
        seconds + " " + (seconds > 1 ? pUnits[i] : sUnits[i]) + separator;
    }
    if (i === 6 && milliseconds > 0) {
      output +=
        milliseconds +
        " " +
        (milliseconds > 1 ? pUnits[i] : sUnits[i]) +
        separator;
    }
  }
  // remove the last separator if present
  //if (output.lastIndexOf(separator) === output.length - separator.length) {
  output = output.substring(0, output.length - separator.length);
  //}

  return output + " " + suffix;
}

// tests
console.log(
  "result: " +
    duration(
      new Date("2020-10-20T00:00:40.210Z"),
      new Date("2021-10-20T23:35:46.217Z"),
      ["yrs", "mths", "days", "hrs"],
      ["yr", "mth", "day", "hr"],
      undefined,
      undefined
    )
);
console.log(" match: 1 yr, 1 day ago");
console.log(" ");

console.log(
  "result: " +
    duration(
      new Date("2020-10-20T00:00:40.210Z"),
      new Date("2021-10-21T23:35:46.217Z"),
      ["yrs", "mths", "days", "hrs"],
      ["yr", "mth", "day", "hr"],
      undefined,
      undefined
    )
);
console.log(" match: 1 yr, 2 days ago");
console.log(" ");

console.log(
  "result: " +
    duration(
      new Date("2020-10-20T10:30:40.210Z"),
      new Date("2021-12-22T11:35:46.217Z"),
      undefined,
      undefined,
      " ",
      undefined
    )
);
console.log(
  " match: 1 year 2 months 3 days 1 hour 5 minutes 6 seconds 7 milliseconds ago"
);
console.log(" ");

console.log(
  "result: " +
    duration(
      new Date("2021-10-20T14:35:46.217Z"),
      new Date("2020-10-20T10:30:40.210Z"),
      ["yrs", "mths", "days", "hrs", "mins", "secs", "milisecs"],
      ["yr", "mth", "day", "hr", "min", "sec", "milisec"],
      undefined,
      undefined
    )
);
console.log(" match: 1 yr, 4 hrs, 5 mins, 6 secs, 7 milisecs until");
