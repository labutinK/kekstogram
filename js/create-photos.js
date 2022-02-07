let picturesBox = document.querySelector('.pictures');
let pictureTemplate = document.querySelector('#picture').content;
let pictureItem = pictureTemplate.querySelector('.picture');

let generateNewPictureItems = function(dataArray){
  let picturesFragment = document.createDocumentFragment();
  dataArray.forEach(function(data){
    let newItem = pictureItem.cloneNode(true);
    newItem.querySelector('.picture__img').src = data.url;
    newItem.querySelector('.picture__likes').textContent = data.likes;
    newItem.querySelector('.picture__comments').textContent = data.comments.length;
    picturesFragment.appendChild(newItem);
  });
  picturesBox.appendChild(picturesFragment);
}

export {generateNewPictureItems};