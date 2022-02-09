import { checkEscapeKey } from './util.js';

const pictureBig = document.querySelector('.big-picture');
const pictureBigSrc = pictureBig.querySelector('.big-picture__img img');
const pictureBigLikes = pictureBig.querySelector('.likes-count');
const pictureBigLabel = pictureBig.querySelector('.social__caption');
const pictureCommentsCount = pictureBig.querySelector('.comments-count');
const pictureCommentsWrapper = pictureBig.querySelector('.social__comments');

const pictureBigCommentsCount = pictureBig.querySelector('.social__comment-count');
const pictureBigCommentsLoader = pictureBig.querySelector('.comments-loader');

const pictureBigClose = pictureBig.querySelector('.big-picture__cancel');


const CommentAvatarSizes = {
  width: 35,
  height: 35,
};

const constructCommentItem = function(comment){
  const commentBox = document.createElement('li');
  const commentImg = document.createElement('img');
  const commentMessage = document.createElement('p');
  commentBox.classList.add('social__comment');
  commentImg.classList.add('social__picture');
  commentImg.src = comment.avatar;
  commentImg.alt = comment.name;
  commentImg.width = CommentAvatarSizes.width;
  commentImg.height = CommentAvatarSizes.height;
  commentBox.appendChild(commentImg);
  commentMessage.classList.add('social__text');
  commentMessage.textContent = comment.message;
  commentBox.appendChild(commentMessage);
  return commentBox;
};

const closeFullPictureHandler = function(){
  pictureBig.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
}

pictureBigClose.addEventListener('click', () => {
  closeFullPictureHandler();
});

const onPopupEscKeydown = function(evt){
  if(checkEscapeKey(evt)){
    closeFullPictureHandler();
  }
};
const fillBigPicture = function({url, likes, comments, description}){
  pictureBigCommentsCount.classList.add('hidden');
  pictureBigCommentsLoader.classList.add('hidden');
  pictureBigSrc.src  = url;
  pictureBigLikes.textContent = likes;
  pictureCommentsCount.textContent = comments.length;
  pictureBigLabel.textContent = description;
  const commentFragment = document.createDocumentFragment();
  comments.forEach(function(value){
    const commentItem = constructCommentItem(value);
    commentFragment.appendChild(commentItem)
  });
  pictureCommentsWrapper.innerHTML = '';
  pictureCommentsWrapper.appendChild(commentFragment);
  pictureBig.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
};


export {fillBigPicture};