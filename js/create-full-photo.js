import { checkEscapeKey } from './util.js';

const pictureBig = document.querySelector('.big-picture');
const pictureBigSrc = pictureBig.querySelector('.big-picture__img img');
const pictureBigLikes = pictureBig.querySelector('.likes-count');
const pictureBigLabel = pictureBig.querySelector('.social__caption');
const pictureCommentsCount = pictureBig.querySelector('.comments-count');
const pictureCommentsWrapper = pictureBig.querySelector('.social__comments');
const bigPictureComment = pictureBig.querySelector('.social__comment');
const pictureBigCommentsCount = pictureBig.querySelector('.social__comment-count');
const pictureBigCommentsLoader = pictureBig.querySelector('.comments-loader');
const pictureBigClose = pictureBig.querySelector('.big-picture__cancel');

const constructCommentItem = function(comment){
  const newComment = bigPictureComment.cloneNode(true);
  const newCommentImg = newComment.querySelector('.social__picture');
  const newCommentMessage = newComment.querySelector('.social__text');
  newCommentImg.src = comment.avatar;
  newCommentImg.alt = comment.name;
  newCommentMessage.textContent = comment.message;
  return newComment;
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
const renderComments = (comments) => {
  const commentFragment = document.createDocumentFragment();
  comments.forEach(function(value){
    const commentItem = constructCommentItem(value);
    commentFragment.appendChild(commentItem)
  });
  pictureCommentsWrapper.innerHTML = '';
  pictureCommentsWrapper.appendChild(commentFragment);
};
const fillBigPicture = function({url, likes, comments, description}){
  pictureBigCommentsCount.classList.add('hidden');
  pictureBigCommentsLoader.classList.add('hidden');
  pictureBigSrc.src  = url;
  pictureBigLikes.textContent = likes;
  pictureCommentsCount.textContent = comments.length;
  pictureBigLabel.textContent = description;
  renderComments(comments);
  pictureBig.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
};


export {fillBigPicture};