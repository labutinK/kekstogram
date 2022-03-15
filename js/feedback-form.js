import {checkEscapeKey } from './util.js';
import {uploadCansel} from './upload-file-toggle.js';
/* eslint-disable no-mixed-spaces-and-tabs */
const uploadForm = document.querySelector('#upload-select-image');
const commentForm = document.querySelector('.text__description');
const hashtag = document.querySelector('.text__hashtags');
const uploadFormSubmit = document.querySelector('.img-upload__submit');
const successTemplate = document.querySelector('#success');
const errorTemplate = document.querySelector('#error');



const body = document.querySelector('body');
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
uploadFormSubmit.addEventListener('click', () => {
  uploadFormSubmit.disabled = true;
  commentForm.disabled = true;
  hashtag.disabled = true;
});


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

const checkClickWhenSuccess = (evt) => {
  if (checkEscapeKey(evt) ||
  (!evt.target.classList.contains('.success__inner') && !evt.target.closest('.success__inner'))){
    hideSuccessSendMessage();
  }
};
const checkClickWhenError = (evt) => {
  if (checkEscapeKey(evt) ||
  (!evt.target.classList.contains('.error__inner') && !evt.target.closest('.error__inner'))){
    hideErrorSendMessage();
  }
};

const hideSuccessSendMessage = () => {
  document.querySelector('.success').remove();
  document.removeEventListener('keydown', checkClickWhenSuccess);
  document.removeEventListener('click', checkClickWhenSuccess);
  body.classList.remove('modal-open');
}
const hideErrorSendMessage = () => {
  document.querySelector('.error').remove();
  document.removeEventListener('keydown', checkClickWhenError);
  document.removeEventListener('click', checkClickWhenError);
  body.classList.remove('modal-open');
}

const showStatusSendMessage = (status) => {
  if (status === 'success'){
    const successTemplateClone = successTemplate.content.cloneNode(true);
    document.body.prepend(successTemplateClone);
    const successCloseBtn = document.querySelector('.success__button');
    successCloseBtn.addEventListener('click', hideSuccessSendMessage);
    document.addEventListener('keydown', checkClickWhenSuccess);
    document.addEventListener('click', checkClickWhenSuccess);
  }
  else if (status === 'error'){
    const errorTemplateClone = errorTemplate.content.cloneNode(true);
    document.body.prepend(errorTemplateClone);
    const errorCloseBtn = document.querySelector('.error__button');
    errorCloseBtn.addEventListener('click', hideErrorSendMessage);
    document.addEventListener('keydown', checkClickWhenError);
    document.addEventListener('click', checkClickWhenError);
  }
  body.classList.add('modal-open');
};


const uploadSuccess = () => {
  uploadCansel();
  showStatusSendMessage('success');
};

const uploadError = () => {
  uploadCansel();
  showStatusSendMessage('error');
};

const uploadFormSubmitHandler = (evt) => {
  evt.preventDefault();
  evt.stopPropagation();
  sendData(
    uploadSuccess,
    uploadError,
    new FormData(uploadForm),
  );
};

uploadForm.addEventListener('submit', uploadFormSubmitHandler)

