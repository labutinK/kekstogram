/* eslint-disable no-mixed-spaces-and-tabs */
var _ = require('lodash');
import { generatePictures } from './create-preview-photos.js';
import './upload-file-toggle.js';
import './scale.js';
import './filters.js';
import {showAlert} from './util.js';
import {createFetch} from './get-data.js'; 
import './feedback-form.js';
import {filterClick, showFilters } from './sort-filters.js';

const displayPrevPhotos = createFetch((photos) => {
  generatePictures(photos);
  showFilters();
  filterClick(_.debounce(() => {generatePictures(photos)}, 500));
}, showAlert);

displayPrevPhotos();




