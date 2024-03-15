const uploadImageFormElement = document.querySelector('#upload-select-image');
const uploadSubmitElement = uploadImageFormElement.querySelector('#upload-submit');
const uploadFileInputElement = uploadImageFormElement.querySelector('#upload-file');// возможно понадобиться для отправки фото
const imageUploadOverlayElement = uploadImageFormElement.querySelector('.img-upload__overlay');
const imageUploadIntupElement = uploadImageFormElement.querySelector('.img-upload__input');
const imageUploadCancelElement = uploadImageFormElement.querySelector('.img-upload__cancel');
const textHashtagsElement = uploadImageFormElement.querySelector('.text__hashtags');
const textDescriptionElement = uploadImageFormElement.querySelector('.text__description');
const imageUploadPreviewElement = uploadImageFormElement.querySelector('.img-upload__preview'); // предварительный просмотр фотографии

export {
  uploadImageFormElement,
  uploadSubmitElement,
  uploadFileInputElement,
  imageUploadOverlayElement,
  imageUploadIntupElement,
  imageUploadCancelElement,
  textHashtagsElement,
  textDescriptionElement,
  imageUploadPreviewElement,
};
