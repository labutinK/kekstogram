// функция генерации случайного числа из диапозона (включительно)
const getRandomInt = function(num1, num2){
  if (num1 < 0 || num2 < 0) return -1;
  if (num2 >= num1){
    return num1 + Math.floor(Math.random() * (num2 - num1 + 1));
  }
  return num2 + Math.floor(Math.random() * (num1 - num2 + 1));
};
  
// функция для проверки строки на макс длину (true - проходит, false - не проходит)
const checkLengthString = function(str, maxLength){
  return (str.length <= maxLength);
};

//Функция генерации случайного числа не имеющегося в переданном массиве (уникального)
const generateUnicNumber = function(num1, num2){
  let prevValues = [];
  return (function(){
    if (prevValues.length === num2 - num1 + 1) return;
    let newNumber = getRandomInt(num1, num2);
    while(prevValues.includes(newNumber)){
      newNumber = getRandomInt(num1, num2);
    }
    prevValues.push(newNumber);
    return newNumber;
  });
}

const checkEscapeKey = function(evt){
  return (evt.key === 'Escape' || evt.key === 'Esc');
};

export {getRandomInt, checkLengthString, generateUnicNumber, checkEscapeKey};
