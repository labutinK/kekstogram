import { generatePictures } from './create-preview-photos.js';
import './upload-file-toggle.js';
import './scale.js';
import './filters.js';
import {checkEscapeKey} from './util.js';

generatePictures();

const uploadForm = document.querySelector('#upload-select-image');
const comment = document.querySelector('.text__description');
const hashtag = document.querySelector('.text__hashtags');
const uploadFormSubmit = document.querySelector('.img-upload__submit');

comment.addEventListener('keydown', (evt) => {
  if (checkEscapeKey(evt)){
    evt.stopPropagation();
    comment.blur();
  }
});
hashtag.addEventListener('keydown', (evt) => {
  if (checkEscapeKey(evt)){
    evt.stopPropagation();
    hashtag.blur();
  }
});

comment.addEventListener('input', function() {
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

uploadForm.addEventListener('input', () => {
  if (comment.classList.contains('has-error') || hashtag.classList.contains('has-error')){
    uploadFormSubmit.disabled = true;
  }
  else {
    uploadFormSubmit.disabled = false;
  }
});