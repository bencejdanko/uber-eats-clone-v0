const express = require('express');
const cdnRouter = express.Router();
const { cdnController } = require('../controllers');

const multer = require('multer');
const upload = multer();

/**
 * @swagger
 * /api/cdn/uploadAvatar:
 *   post:
 *     summary: Upload a user avatar image
 *     tags: [CDN]
 *     security:
 *       - sessionAuth: []
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload (JPG format)
 *     responses:
 *       200:
 *         description: Avatar uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Key:
 *                   type: string
 *                   description: The S3 object key of the uploaded file
 *       401:
 *         description: Unauthorized - Valid customer session required
 *       500:
 *         description: Server error during upload
 */
cdnRouter.post('/uploadAvatar', upload.single("file"), cdnController.uploadAvatar);

module.exports = cdnRouter;
