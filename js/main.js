/* eslint-disable no-mixed-spaces-and-tabs */
import { generatePictures } from './create-preview-photos.js';
import './upload-file-toggle.js';
import './scale.js';
import './filters.js';
import { showAlert } from './util.js';
import {createFetch} from './get-data.js'; 

const displayPrevPhotos = createFetch(generatePictures, showAlert);

displayPrevPhotos();

