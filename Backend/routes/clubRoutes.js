const express = require('express');
const router = express.Router();
const clubController = require('../controller/clubController');
const createUploadMiddleware = require('../middleware/createUploadMiddleware');

const uploadClubLogo = createUploadMiddleware({
  directory: 'club',
  fieldName: 'logo',
  entityName: 'Club Logo',
  fileSizeLimit: 1024 * 1024 * 5, // 5MB
  allowedMimeTypes: /^image\// //
});

router.post('/create', uploadClubLogo, clubController.create);
router.get('/all', clubController.getAll);
router.get('/:id', clubController.getById);
router.patch('/edit/:id', uploadClubLogo, clubController.update);
router.delete('/delete/:id', clubController.delete);

module.exports = router;
