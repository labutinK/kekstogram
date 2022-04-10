/* eslint-disable no-mixed-spaces-and-tabs */
const createFetch = (onSuccess, onError) => () => {
  return fetch(
    'https://23.javascript.pages.academy/kekstagram/data',
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((json) => {
      onSuccess(json);
    })
    .catch(() => {
	  onError('Не удалось загрузить фото');
    });
};

export {createFetch};