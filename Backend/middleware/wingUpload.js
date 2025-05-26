const createUploadMiddleware = require('./createUploadMiddleware');

const wingFieldsConfig = [
  { name: 'logo', maxCount: 1 },
  { name: 'coverImage', maxCount: 1 },
  { name: 'gallery', maxCount: 10 }
];

const wingUpload = createUploadMiddleware({
  directory: 'wings',
  fieldName: wingFieldsConfig,
  entityName: 'wing assets',
  uploadType: 'fields'
});

module.exports = wingUpload;
