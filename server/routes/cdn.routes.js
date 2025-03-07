const express = require('express');
const cdnRouter = express.Router();
const { cdnController } = require('../controllers');

cdnRouter.post('/upload', cdnController.uploadFile);

module.exports = cdnRouter;
