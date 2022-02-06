const express = require('express')
const router = express.Router()
const uploadCsvController = require('../controllers/upload-csv')
const multer = require('multer');
const upload = multer({ dest: 'tmp/csv/' });

router.post('/upload-csv', upload.single('file'), uploadCsvController)

module.exports = router
