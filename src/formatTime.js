const formatTime = (num, unit) => {
  let remaining = num;
  let decimal = 0;

  // ms --> decimal of seconds
  if (unit === 'ms') {
    decimal = num % 1000;
    remaining = (num - decimal) / 1000;
  }

  // seconds
  let seconds = remaining % 60;
  remaining = (remaining - seconds) / 60;

  // minutes
  let minutes = remaining % 60;
  remaining = (remaining - minutes) / 60;

  // hours
  let hours = remaining;

  let str = '';
  if (hours > 0) {
    str += `${hours}:`; 
  }
  str += `${ minutes.toString().padStart(2, '0') }:`;
  str += `${ seconds.toString().padStart(2, '0') }`;
  if (decimal > 0) {
    str += `.${ decimal }`;
  }

  return str;
}

export default formatTime;