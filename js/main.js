import { generatePictures } from './create-preview-photos.js';
import './upload-file-toggle.js';
import './scale.js';
import './filters.js';
import {checkEscapeKey} from './util.js';

generatePictures();

const comment = document.querySelector('.text__description');
const hashtag = document.querySelector('.text__hashtags');

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

hashtag.addEventListener('blur', function(){
  let hashtagValue = this.value.toLowerCase();
  let arraySplit = hashtagValue.trim().split(' ');
  arraySplit.forEach((val) => {
    if(val[0] !== '#'){
      this.setCustomValidity('Хештеги должны начинаться с "#"');
    }
    else if(!(/[!@#$&*%]/.test(val.slice(1, 0)))){
      this.setCustomValidity('Хештеги не должны содержать специальных символов');
    }
    else {
      this.setCustomValidity('');
    }
  })
  this.reportValidity();
});
