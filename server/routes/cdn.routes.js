const express = require('express');
const cdnRouter = express.Router();
const { cdnController } = require('../controllers');

const multer = require('multer');
const upload = multer();

cdnRouter.post('/uploadAvatar', upload.single("file"), cdnController.uploadAvatar);

module.exports = cdnRouter;
