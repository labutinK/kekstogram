import { checkEscapeKey } from './util.js';
import {chooseOriginalFilter} from './filters.js';
import {uploadPrevPhotoResize} from './scale.js';

const uploadFile = document.querySelector('#upload-file');
const uploadWrapper = document.querySelector('.img-upload__overlay');
const uploadWrapperCancel = document.querySelector('#upload-cancel');
const body = document.querySelector('body');

const uploadForm = document.querySelector('#upload-select-image');
const commentForm = document.querySelector('.text__description');
const hashtag = document.querySelector('.text__hashtags');
const uploadFormSubmit = document.querySelector('.img-upload__submit');

const resetSettings = function() {
  uploadFile.value = '';
  chooseOriginalFilter();
  uploadPrevPhotoResize('100');
  hashtag.value = '';
  commentForm.value = '';
  hashtag.classList.remove('has-error');
  commentForm.classList.remove('has-error');
};

const uploadCansel = function(){
  uploadWrapper.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onUploadWrapperCancel);
  resetSettings();
}

uploadWrapperCancel.addEventListener('click', function(){
  uploadCansel();
});

const onUploadWrapperCancel = function(evt){
  if(checkEscapeKey(evt)){
    uploadCansel();
  }
}

const uploadOpen = function(){
  uploadWrapper.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown',onUploadWrapperCancel);
};

uploadFile.addEventListener('change', function () {
  uploadOpen();
  chooseOriginalFilter();
});


const uploadFormHandler = function() {
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
  if(commentLength > 10){
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
  errorFlag = arraySplit.find((val, ind) => {
    if (ind > 4){
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
    else {
      this.setCustomValidity('');
      return false;
    }
  });
  (!errorFlag) ? this.classList.remove('has-error') : this.classList.add('has-error');
  this.reportValidity();
});

uploadForm.addEventListener('input', uploadFormHandler);