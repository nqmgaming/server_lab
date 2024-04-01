const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const upload = require('../middlewares/multer.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

require('dotenv').config();
router.post('/register', upload.single('avatar'), userController.createUser);
router.post('/login', userController.loginUser);
router.patch('/update/:id', upload.single('avatar'), authMiddleware.authenticateToken, userController.patchUser);

module.exports = router;