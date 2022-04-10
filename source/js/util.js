const ALERT_SHOW_TIME = 4000;

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
// функция проверки нажатой клавиши escape
const checkEscapeKey = function(evt){
  return (evt.key === 'Escape' || evt.key === 'Esc');
};

//показ ошибки при загрузки фото
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('alert-message');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  
  alertContainer.textContent = message;
  
  document.body.append(alertContainer);
  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://23.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};


export {getRandomInt, checkLengthString, generateUnicNumber, checkEscapeKey, showAlert, sendData};
