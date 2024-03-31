const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const upload = require('../middlewares/multer.middleware');

require('dotenv').config();
router.post('/register', upload.single('avatar'), userController.createUser);
router.post('/login', userController.loginUser);

module.exports = router;