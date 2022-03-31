/* eslint-disable no-mixed-spaces-and-tabs */
import { generatePictures, generateRandomPictures } from './create-preview-photos.js';
import './upload-file-toggle.js';
import './scale.js';
import './filters.js';
import {showAlert} from './util.js';
import {createFetch} from './get-data.js'; 
import './feedback-form.js';
import {randomFilterClick, defaultFilterClick, showFilters } from './sort-filters.js';

const displayPrevPhotos = createFetch((photos) => {
  generatePictures(photos);
  showFilters();
  randomFilterClick(() => {generateRandomPictures(photos)});
  defaultFilterClick(() => generatePictures(photos));
}, showAlert);

displayPrevPhotos();




