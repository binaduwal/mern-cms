const createUploadMiddleware = require('./createUploadMiddleware'); // Assuming createUploadMiddleware.js is in the same directory

const partnerUpload = createUploadMiddleware({
    directory: 'partners',      
    fieldName: 'logo',          
    entityName: 'partner logo',
});

module.exports = partnerUpload;
