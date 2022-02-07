import {createPhotoDataItems} from './data.js';
import {generateNewPictureItems} from './create-photos.js';
const NUM_OF_PHOTO_OBJECTS = 19;

const photoDataArray = createPhotoDataItems(NUM_OF_PHOTO_OBJECTS);

generateNewPictureItems(photoDataArray);




