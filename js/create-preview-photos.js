import { fillBigPicture } from './create-full-photo.js';
const picturesBox = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const pictureItem = pictureTemplate.querySelector('.picture');
const PREV_PHOTO_COUNT = 12;

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

const generatePictures = function(prevPhotos){
  const picturesFragment = document.createDocumentFragment();
  prevPhotos.slice(0,PREV_PHOTO_COUNT).forEach(function(value){
    picturesFragment.appendChild(generateOnePicture(value));
  });
  picturesBox.appendChild(picturesFragment);
}


export {generatePictures};