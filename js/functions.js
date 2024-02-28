// Длинна строки
const checkStrLen = (str, len) => str.length <= len;

// Строка короче 20 символов
checkStrLen('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkStrLen('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkStrLen('проверяемая строка', 10); // false

// Палиндром
function isPalendrom(str) {
  const replaceStr = str.replaceAll(' ', '');
  const lowerCaseStr = replaceStr.toLowerCase();
  //console.log(lowerCaseStr);

  //const reverseStr = lowerCaseStr.split('').reverse().join('');

  let reverseStr = '';
  for (let index = lowerCaseStr.length - 1; index >= 0; index--) {
    reverseStr += lowerCaseStr[index];
  }
  //console.log(lowerCaseStr.split(''));
  //console.log(lowerCaseStr.split('')).reverse());
  //console.log(reverseStr);

  return reverseStr === lowerCaseStr;
}

// Строка является палиндромом
isPalendrom('топот'); // true
// Несмотря на разный регистр, тоже палиндром
isPalendrom('ДовОд'); // true
// Это не палиндром
isPalendrom('Кекс'); // false

// Это палиндром
isPalendrom('Лёша на полке клопа нашёл '); // true

// Преобразовать в число
function getNumber(str) {
  //console.log(str);
  const sstr = String(str);
  //console.log(sstr);

  /*
  if (typeof(str) === 'number') {
    sstr = str.toString();
  }
  */

  let numberStr = '';

  for (let index = 0; index < sstr.length; index++) {
    const symb = sstr[index];
    const numb = parseInt(symb, 10);
    if (!Number.isNaN(numb)) {
      //console.log(numb);
      numberStr += symb;
    }
  }
  //console.log(parseInt(numberStr));

  //console.log('-----');
  return parseInt(numberStr, 10);
}

getNumber('2023 год'); // 2023
getNumber('ECMAScript 2022'); // 2022
getNumber('1 кефир, 0.5 батона'); // 105
getNumber('агент 007'); // 7
getNumber('а я томат'); // NaN

getNumber(2023); // 2023
getNumber(-1); // 1
getNumber(1.5); // 15


// Проверка встречи checkMeetingTime

const getDate = (timeSring, shortMinuteMultiply10 = false/*true*/) => {
  //console.log(timeSring);

  const date = new Date();

  const array = timeSring.toString().replaceAll(' ', '').split(':');
  //console.log(array);

  if (array.length !== 2) {
    return null;
  }

  date.setHours(parseInt(array[0], 10));

  let minuteString = array[1];
  if (shortMinuteMultiply10 && (minuteString.length === 1)) {
    minuteString += '0';
  }
  date.setMinutes(parseInt(minuteString, 10));

  date.setSeconds(0);
  date.setMilliseconds(0);

  //console.log(date);
  return date;
};

const checkMeetingTime = (workTimeBeginString, workTimeEndString, meetTimeBeginString, meetDurationMinutes) => {
  if (meetDurationMinutes <= 0) {
    return false;
  }

  // Есть вариант решения, через приведение всего времени в минуты
  // workMinutesBegin = getAllMinutes(workTimeBeginString) // часы * 60 + минуты
  // ...

  // Решим через Date
  const workDateBegin = getDate(workTimeBeginString);
  const workDateEnd = getDate(workTimeEndString);

  if (workDateBegin > workDateEnd) {
    return false;
  }

  const meetDateBegin = getDate(meetTimeBeginString);
  const meetDateEnd = new Date(meetDateBegin);
  meetDateEnd.setMinutes(meetDateEnd.getMinutes() + meetDurationMinutes);

  //console.log('---------------');
  //console.log(workDateTimeBegin);
  //console.log(workDateTimeEnd);
  //console.log(meetDateTimeBegin);
  //console.log(meetDateTimeEnd);
  //console.log((meetDateTimeBegin >= workDateTimeBegin) && (meetDateTimeEnd <= workDateTimeEnd));

  return ((meetDateBegin >= workDateBegin) && (meetDateEnd <= workDateEnd));
};

checkMeetingTime('08:00', '17:30', '14:00', 90); // true
checkMeetingTime('8:0', '10:0', '8:0', 120); // true
checkMeetingTime('08:00', '14:30', '14:00', 90); // false
checkMeetingTime('14:00', '17:30', '08:0', 90); // false
checkMeetingTime('8:00', '17:30', '08:00', 900); // false
checkMeetingTime('8:00', '17:30', '08:5', 900); // false
checkMeetingTime('8:00', '17:30', '08:05', 900); // false
checkMeetingTime('8:00', '17:30', '08:05', 9000); // false
