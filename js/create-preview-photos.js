import { fillBigPicture } from './create-full-photo.js';
import {generateUnicNumber } from './util.js';
const picturesBox = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const pictureItem = pictureTemplate.querySelector('.picture');
const PhotosToShow = {
  default : 12,
  rand : 10,
}




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
  prevPhotos.slice(0,PhotosToShow.default).forEach(function(value){
    picturesFragment.appendChild(generateOnePicture(value));
  });
  clearPhotos();
  picturesBox.appendChild(picturesFragment);
}

const clearPhotos = () => {
  document.querySelectorAll('.picture').forEach((el) => {
    el.remove();
  })
};

const generateRandomPictures = function(prevPhotos){
  let generateUnicRandomPic = generateUnicNumber(0, prevPhotos.length - 1);
  let prevPhotoClone = prevPhotos.slice();
  const picturesFragment = document.createDocumentFragment();
  for(let i = 1; i <= PhotosToShow.rand; i++){
    picturesFragment.appendChild(generateOnePicture(prevPhotoClone[generateUnicRandomPic()]));
  }
  clearPhotos();
  picturesBox.appendChild(picturesFragment);
};


export {generatePictures, generateRandomPictures};