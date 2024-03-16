const uploadImageFormElement = document.querySelector('#upload-select-image');
const uploadSubmitElement = uploadImageFormElement.querySelector('#upload-submit');
const uploadFileInputElement = uploadImageFormElement.querySelector('#upload-file'); // возможно понадобиться для отправки фото
const imageUploadOverlayElement = uploadImageFormElement.querySelector('.img-upload__overlay');
const imageUploadIntupElement = uploadImageFormElement.querySelector('#upload-file');
const imageUploadCancelElement = uploadImageFormElement.querySelector('#upload-cancel');
const hashtagsIntupElement = uploadImageFormElement.querySelector('[name="hashtags"]');
const descriptionIntupElement = uploadImageFormElement.querySelector('[name="description"]');
const imageUploadPreviewElement = uploadImageFormElement.querySelector('.img-upload__preview'); // предварительный просмотр фотографии

export {
  uploadImageFormElement,
  uploadSubmitElement,
  uploadFileInputElement,
  imageUploadOverlayElement,
  imageUploadIntupElement,
  imageUploadCancelElement,
  hashtagsIntupElement,
  descriptionIntupElement,
  imageUploadPreviewElement,
};
