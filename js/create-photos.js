import {photoDataArray} from './data.js';
let picturesBox = document.querySelector('.pictures');
let pictureTemplate = document.querySelector('#picture').content;
let pictureItem = pictureTemplate.querySelector('.picture');



const pictureMini = document.querySelectorAll('.picture');
const pictureBig = document.querySelector('.big-picture');
const pictureBigSrc = pictureBig.querySelector('.big-picture__img img');
const pictureBigLikes = pictureBig.querySelector('.likes-count');
const pictureCommentsCount = pictureBig.querySelector('.comments-count');
const pictureCommentsWrapper = pictureBig.querySelector('.social__comments');


const constructCommentItem = function(comment){
  let commentBox = document.createElement('li');
  let commentImg = document.createElement('img');
  let commentMessage = document.createElement('p');
  commentBox.classList.add('social__comment');
  commentImg.classList.add('social__picture');
  commentImg.src = comment.avatar;
  commentImg.alt = comment.name;
  commentImg.width = '35';
  commentImg.height = '35';
  commentBox.appendChild(commentImg);
  commentMessage.classList.add('social__text');
  commentMessage.textContent = comment.message;
  commentBox.appendChild(commentMessage);
  return commentBox;
};

const fillBigPicture = function({url, likes, comments}){
  pictureBigSrc.src  = url;
  pictureBigLikes.textContent = likes;
  pictureCommentsCount.textContent = comments.length;
  let commentFragment = document.createDocumentFragment();
  comments.forEach(function(value){
    let commentItem = constructCommentItem(value);
    commentFragment.appendChild(commentItem)
  });
  pictureCommentsWrapper.innerHTML = '';
  pictureCommentsWrapper.appendChild(commentFragment);
};


let generateOnePicture = function({url, likes, comments}){
  let newItem = pictureItem.cloneNode(true);
  newItem.querySelector('.picture__img').src = url;
  newItem.querySelector('.picture__likes').textContent = likes;
  newItem.querySelector('.picture__comments').textContent = comments.length;
  newItem.addEventListener('click', function(evt){
    evt.preventDefault();
    fillBigPicture({url, likes, comments});
    pictureBig.classList.remove('hidden');
  });
  return newItem;
};

let generatePictures = function(){
  let picturesFragment = document.createDocumentFragment();
  photoDataArray.forEach(function(value){
    picturesFragment.appendChild(generateOnePicture(value));
  });
  picturesBox.appendChild(picturesFragment);
}

let generatedInstPictures = generatePictures();






export {generatedInstPictures};