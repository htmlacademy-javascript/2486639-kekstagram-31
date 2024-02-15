//"use strict";

//alert('1111111111');
function checkStrLen(str, len) {
  return str.length <= len;
}

// Строка короче 20 символов
checkStrLen('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkStrLen('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkStrLen('проверяемая строка', 10); // false


function isPalendrom(str) {
  //console.log(str);

  const replaceStr = str.replaceAll(' ', '');
  const lowerCaseStr = replaceStr.toLowerCase();
  //console.log(lowerCaseStr);

  //const reverseStr = lowerCaseStr.split("").reverse().join("");

  let reverseStr = '';
  for (let index = lowerCaseStr.length - 1; index >= 0; index--) {
    reverseStr += lowerCaseStr[index];
  }
  //console.log(lowerCaseStr.split(""));
  //console.log(lowerCaseStr.split("").reverse());
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
    if (!Number.isNaN(numb)){
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
