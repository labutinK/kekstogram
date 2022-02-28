import { checkEscapeKey } from './util.js';
import {chooseOriginalFilter} from './filters.js';
import {uploadPrevPhotoResize} from './scale.js';

const uploadFile = document.querySelector('#upload-file');
const uploadWrapper = document.querySelector('.img-upload__overlay');
const uploadWrapperCancel = document.querySelector('#upload-cancel');
const body = document.querySelector('body');

const uploadCansel = function(){
  uploadWrapper.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown',onUploadWrapperCancel);
  uploadFile.value = '';
}

uploadWrapperCancel.addEventListener('click', function(){
  uploadCansel();
});

const onUploadWrapperCancel = function(evt){
  if(checkEscapeKey(evt)){
    uploadCansel();
  }
}

const uploadOpen = function(){
  uploadWrapper.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown',onUploadWrapperCancel);
};

uploadFile.addEventListener('change', function () {
  uploadOpen();
  chooseOriginalFilter();
  uploadPrevPhotoResize('100');
});
uploadOpen();

