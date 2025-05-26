const createUploadMiddleware = require('./createUploadMiddleware'); 

const partnerUpload = createUploadMiddleware({
    directory: 'partners',      
    fieldName: 'logo',          
    entityName: 'partner logo',
});

module.exports = partnerUpload;
