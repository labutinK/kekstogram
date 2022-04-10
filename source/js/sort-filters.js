const pictureFilters = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');

const photoFilterChange = (evt) => {
  Array.from(filterButtons).some((el) => {
    if(el.classList.contains('img-filters__button--active')){
      el.classList.remove('img-filters__button--active');
      return true;
    }
  });
  evt.target.classList.add('img-filters__button--active');
};

const showFilters = () => {
  pictureFilters.classList.remove('img-filters--inactive');
}

const filterClick = (cb) => {
  filterButtons.forEach((el) => {
    el.addEventListener('click', (evt) => {
      if(!evt.target.classList.contains('img-filters__button--active')){
        photoFilterChange(evt);
        cb();
      }
    });
  })
}

  

export {filterClick, showFilters};