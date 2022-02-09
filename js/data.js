import { getRandomInt, generateUnicNumber } from './util.js';

const NUM_OF_PHOTO_OBJECTS = 19;

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
  
const COMMENT_NAMES = [
  'Aртем',
  'Игорь',
  'Оля',
  'Яна',
  'Сергей',
  'Федор',
  'Лиза',
  'Егор',
];
const COMMENTS_DESCRIPTIONS= [
  'случайно жмакнул и труляля',
  'ж0оско вышло да?)',
  'хорошее место чтобы выпить пЫва',
  'ало?? это прачечная??',
  'я вышел покурить на 17 лет',
  'вернулся домой вместо дома трава',
  'я взял до дома обратный билет',
  'но трамвай не пришел. не придет никогда!(',
];
const LikesInterval = {
  min: 15,
  max: 200,
};
const CommentsStringInterval = {
  min: 1,
  max: 2,
};
const CommentsAvatarInterval = {
  min: 1,
  max: 6,
};
const CommentsUsersIdInterval = {
  min: 1,
  max: 300,
};
const CommentsQuanityInterval = {
  min: 1,
  max: 5,
};

const commentMessageGenerate = (numOfStrings) => {
  let resultComment = '';
  if(numOfStrings > 0){
    const generateMessage = generateUnicNumber(0, COMMENT_MESSAGES.length - 1);
    for (let i = 0; i < numOfStrings && i < COMMENT_MESSAGES.length; i++){
      resultComment += COMMENT_MESSAGES[generateMessage()];
    }
  }
  return resultComment;
}
  
const createPhotoDataItems = (numOfObj) => {
  const genereateUnicId = generateUnicNumber(1, numOfObj);
  const generateUnicUrl = generateUnicNumber(1, numOfObj);
  const generateUnicIdUser = generateUnicNumber(CommentsUsersIdInterval.min, CommentsUsersIdInterval.max );
  const resultArray = new Array(numOfObj).fill(null).map(() => {
    return {
      id : genereateUnicId(), // id уникальные (1 - 25) 
      url : `photos/${generateUnicUrl()}.jpg`, //k уникальные (1 - 25)
      description : COMMENTS_DESCRIPTIONS[getRandomInt(0,COMMENTS_DESCRIPTIONS.length - 1 )],
      likes : `${getRandomInt(LikesInterval.min, LikesInterval.max)}`, //j случайное число 15-200
      comments : new Array(getRandomInt(CommentsQuanityInterval.min, CommentsQuanityInterval.max)).fill(null).map(() => {
        return {
          id: `${generateUnicIdUser()}`, // случайное уникальное
          avatar: `img/avatar-${getRandomInt(CommentsAvatarInterval.min, CommentsAvatarInterval.max)}.svg`, //img/avatar-{{случайное число от 1 до 6}}.svg
          message: `${commentMessageGenerate(getRandomInt(CommentsStringInterval.min,CommentsStringInterval.max))}`, //COMMENT_MESSAGES
          name: `${COMMENT_NAMES[getRandomInt(0, COMMENT_NAMES.length - 1)]}`, //COMMENT_NAMES
        };
      }),
    };
  });
  return resultArray;
};


const photoDataArray = createPhotoDataItems(NUM_OF_PHOTO_OBJECTS);

export {photoDataArray};
