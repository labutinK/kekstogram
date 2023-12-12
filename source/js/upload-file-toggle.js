import {checkEscapeKey} from './util.js';
import {chooseOriginalFilter} from './filters.js';
import {uploadPrevPhotoResize} from './scale.js';

const uploadFile = document.querySelector('#upload-file');
const uploadWrapper = document.querySelector('.img-upload__overlay');
const uploadWrapperCancel = document.querySelector('#upload-cancel');
const body = document.querySelector('body');
const commentForm = document.querySelector('.text__description');
const hashtag = document.querySelector('.text__hashtags');
const previewBoxes = document.querySelectorAll('.effects__preview');
const uploadPhotoBox = document.querySelector('.img-upload__preview img');

const resetFeedbackSettings = () => {
  hashtag.value = '';
  commentForm.value = '';
  commentForm.disabled = false;
  hashtag.disabled = false;
  hashtag.classList.remove('has-error');
  commentForm.classList.remove('has-error');
}

const resetSettings = function () {
  uploadFile.value = '';
  chooseOriginalFilter();
  uploadPrevPhotoResize('100');
  resetFeedbackSettings();
};

const uploadCansel = function () {
  uploadWrapper.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onUploadWrapperCancel);
  resetSettings();
}

uploadWrapperCancel.addEventListener('click', function () {
  uploadCansel();
});

const onUploadWrapperCancel = function (evt) {
  if (checkEscapeKey(evt)) {
    uploadCansel();
  }
}

const uploadOpen = function () {
  uploadWrapper.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onUploadWrapperCancel);
};

const FILE_TYPES = ['jpeg', 'png', 'jpg'];

uploadFile.addEventListener('change', function () {
  uploadOpen();
  chooseOriginalFilter();
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      uploadPhotoBox.src = reader.result;
      uploadPhotoBox.width = 600;
      uploadPhotoBox.height = 600;
      previewBoxes.forEach((el) => {
        el.style.backgroundImage = `url('${reader.result}')`;
      })
    });
    reader.readAsDataURL(file);
  }
});


export {uploadCansel};
