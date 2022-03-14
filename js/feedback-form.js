import {checkEscapeKey, showSuccesSendMessage } from './util.js';
import {uploadCansel} from './upload-file-toggle.js';
/* eslint-disable no-mixed-spaces-and-tabs */
const uploadForm = document.querySelector('#upload-select-image');
const commentForm = document.querySelector('.text__description');
const hashtag = document.querySelector('.text__hashtags');
const uploadFormSubmit = document.querySelector('.img-upload__submit');

const COMMENT_MAXLENGTH = 140;
const HASHTAG_MAXLENGTH = 5;


  
const uploadFormInputHandler = function() {
  if (commentForm.classList.contains('has-error') || hashtag.classList.contains('has-error')){
	  uploadFormSubmit.disabled = true;
  }
  else {
	  uploadFormSubmit.disabled = false;
  }
};

commentForm.addEventListener('keydown', (evt) => {
  if (checkEscapeKey(evt)){
	  evt.stopPropagation();
	  commentForm.blur();
  }
});
hashtag.addEventListener('keydown', (evt) => {
  if (checkEscapeKey(evt)){
	  evt.stopPropagation();
	  hashtag.blur();
  }
});

commentForm.addEventListener('input', function() {
  let commentLength = this.value.length;
  if(commentLength > COMMENT_MAXLENGTH){
	  this.setCustomValidity('Комментарий не может содержать более 140 симв.');
	  this.classList.add('has-error');
  }
  else {
	  this.classList.remove('has-error');
	  this.setCustomValidity('');
  }
  this.reportValidity();
});

  
hashtag.addEventListener('input', function(){
  let hashtagValue = this.value.toLowerCase();
  let arraySplit = hashtagValue.trim().split(' ');
  let errorFlag;
  errorFlag = arraySplit.find((val, ind, arrayCurrent) => {
	  if (ind > HASHTAG_MAXLENGTH - 1){
      this.setCustomValidity('Можно добавить только 5 хештегов');
      return true;
	  }
	  else if(val[0] !== '#'){
      this.setCustomValidity('Хештеги должны начинаться с "#"');
      return true;
	  }
	  else if(/[!@#$&*'")(></.,~`\]}|[{%]/.test(val.slice(1, val.length))){
      this.setCustomValidity('Хештеги не должны содержать специальных символов');
      return true;
	  }
	  else if(arrayCurrent.indexOf(val) !== ind){
      this.setCustomValidity('Хештеги не должны повторяться');
      return true;
	  }
	  else {
      this.setCustomValidity('');
      return false;
	  }
  });
  (!errorFlag) ? this.classList.remove('has-error') : this.classList.add('has-error');
  this.reportValidity();
});

uploadForm.addEventListener('input', uploadFormInputHandler);

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
      // onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

const uploadSuccess = () => {
  uploadCansel();
  showSuccesSendMessage();  
}

const uploadFormSubmitHandler = (evt) => {
  evt.preventDefault();
  sendData(
    uploadSuccess,
    () => console.log('fail'),
    new FormData(uploadForm),
  );
};

uploadForm.addEventListener('submit', uploadFormSubmitHandler)

