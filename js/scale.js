const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleControl = document.querySelector('.scale__control--value');
const uploadPreviewPhoto = document.querySelector('.img-upload__preview img');

const scaleStep = 25;
const ScaleRange = {
  min : 25,
  max : 100,
}

const uploadPrevPhotoResize = function(val){
  uploadPreviewPhoto.style.transform = `scale(${val}%)`;
  scaleControl.value = val + '%';
} 

const scaleControlActions = function(flag){
  let scaleCurrent = scaleControl.value;
  let scaleValCurrent = scaleCurrent.slice(0, scaleCurrent.indexOf('%'));
  if (flag === '-' && scaleValCurrent >= scaleStep + ScaleRange.min ){
    scaleValCurrent -= scaleStep;
  }
  else if (flag === '+' && scaleValCurrent <= ScaleRange.max - scaleStep ){
    scaleValCurrent = Number(scaleValCurrent) + scaleStep;
  }
  uploadPrevPhotoResize(scaleValCurrent);
}


scaleSmaller.addEventListener('click', function(){
  scaleControlActions('-');
});

scaleBigger.addEventListener('click', function(){
  scaleControlActions('+');
});

export {uploadPrevPhotoResize};