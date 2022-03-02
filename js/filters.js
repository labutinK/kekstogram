const filters = document.querySelectorAll('.effects__radio');
const prevPhoto = document.querySelector('.img-upload__preview img');
const filterSlider = document.querySelector('.effect-level__slider');
const filterSliderValue = document.querySelector('.effect-level__value');
const filterWrapper = document.querySelector('.img-upload__effect-level');


const EFFECTS_STYLES = {
  'none' : {
    name: 'none',
  },
  'chrome':{
    name:'grayscale',
    min: 0,
    max : 1,
    step: 0.1,
  },
  'sepia':{
    name:'sepia',
    min: 0,
    max:1,
    step: 0.1,
  },
  'marvin': {
    name:'invert',
    min:0,
    max: 100,
    step: 1,
    measure : '%',
  },
  'phobos': {
    name : 'blur',
    min : 1,
    max : 3,
    step : 0.1,
    measure : 'px',
  },
  'heat' : {
    name: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
  },
}
noUiSlider.create(filterSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step : 0.1,
});

const currentFilterSet = function(val){
  let currentFilter = val;
  return function(){
    return currentFilter;
  }
}

let currentFilterReturn = currentFilterSet('none');

const chooseOriginalFilter = function() {
  prevPhoto.style.filter = 'none';
  filterSliderValue.value = '0';
  filterWrapper.style.display = 'none';
  document.querySelector('#effect-none').checked = true;
};

const changeSliderValue = function(values){
  filterSliderValue.value = values[0];
  let currentFilter = currentFilterReturn();
  if ( EFFECTS_STYLES[`${currentFilter}`]['name'] === 'none'){
    chooseOriginalFilter();
    return;
  }
  if( EFFECTS_STYLES[`${currentFilter}`]['measure']){
    let measure = EFFECTS_STYLES[`${currentFilter}`]['measure'];
    let filterValue = EFFECTS_STYLES[`${currentFilter}`]['name'] + `(${values}` + `${measure})`;
    prevPhoto.style.filter = `${filterValue}`;
    return;
  }
  let filterValue =   EFFECTS_STYLES[`${currentFilter}`]['name'] + `(${values})`;
  prevPhoto.style.filter = `${filterValue}`;
}

const initSliderForNewFilter = function(){
  let currentFilter = currentFilterReturn();
  if (currentFilter === 'none'){
    chooseOriginalFilter();
    return
  }
  filterWrapper.style.display = 'block';
  filterSliderValue.value = EFFECTS_STYLES[`${currentFilter}`]['max'];
  filterSlider.noUiSlider.updateOptions({
    range: {
      min: EFFECTS_STYLES[`${currentFilter}`]['min'],
      max: EFFECTS_STYLES[`${currentFilter}`]['max'],
    },
    start: EFFECTS_STYLES[`${currentFilter}`]['max'],
    step : EFFECTS_STYLES[`${currentFilter}`]['step'], 
  });
  changeSliderValue([EFFECTS_STYLES[`${currentFilter}`]['max']]);
};

filterSlider.noUiSlider.on('change', changeSliderValue);

const onFilter = function(evt) {
  let currentFilter = currentFilterReturn();
  prevPhoto.classList.remove('effects__preview--' + currentFilter);
  let newFilter = evt.target.value;
  if (newFilter === 'none'){
    prevPhoto.style.filter = 'none';
    currentFilterReturn = currentFilterSet('none');
  }
  else {
    currentFilterReturn = currentFilterSet(newFilter);
    prevPhoto.classList.add('effects__preview--' + newFilter);
  }
  initSliderForNewFilter();
};

filters.forEach(function(val){
  val.addEventListener('change', onFilter);
});

export {chooseOriginalFilter};