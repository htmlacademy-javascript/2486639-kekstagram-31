const IMAGE_FILE_TYPES = ['jpg', 'jpeg', 'png'];

const isImageFileType = (fileName) => {
  const lowerCaseFileName = fileName.toLowerCase();
  return IMAGE_FILE_TYPES.some((type) => lowerCaseFileName.endsWith(type));
};

export { isImageFileType };
