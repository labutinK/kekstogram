import {photoDataArray} from './data.js';
import { fillBigPicture } from './create-full-photo.js';
const picturesBox = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const pictureItem = pictureTemplate.querySelector('.picture');

const generateOnePicture = function(picture){
  const newItem = pictureItem.cloneNode(true);
  newItem.querySelector('.picture__img').src = picture.url;
  newItem.querySelector('.picture__likes').textContent = picture.likes;
  newItem.querySelector('.picture__comments').textContent = picture.comments.length;
  newItem.addEventListener('click', function(evt){
    evt.preventDefault();
    fillBigPicture(picture);
  });
  return newItem;
};

const generatePictures = function(){
  const picturesFragment = document.createDocumentFragment();
  photoDataArray.forEach(function(value){
    picturesFragment.appendChild(generateOnePicture(value));
  });
  picturesBox.appendChild(picturesFragment);
}


export {generatePictures};