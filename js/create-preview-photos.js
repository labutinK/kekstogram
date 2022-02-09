import {photoDataArray} from './data.js';
import { fillBigPicture } from './create-full-photo.js';
const picturesBox = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const pictureItem = pictureTemplate.querySelector('.picture');

const generateOnePicture = function({url, likes, comments, description}){
  const newItem = pictureItem.cloneNode(true);
  newItem.querySelector('.picture__img').src = url;
  newItem.querySelector('.picture__likes').textContent = likes;
  newItem.querySelector('.picture__comments').textContent = comments.length;
  newItem.addEventListener('click', function(evt){
    evt.preventDefault();
    fillBigPicture({url, likes, comments, description});
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