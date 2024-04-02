const express = require('express');
const router = express.Router();

const fruitsController = require('../controllers/fruits.controller');
const authMiddleware = require('../middlewares/auth.middleware');
require('dotenv').config();
const upload = require('../middlewares/multer.middleware');
const multer = require('multer');

// Create Fruit
router.post('/create', upload.array("images"), authMiddleware.authenticateToken, fruitsController.createFruit);

// Get Fruits
router.get('/', authMiddleware.authenticateToken, fruitsController.getFruits);

// Get Fruit by ID
router.get('/:fruitId', authMiddleware.authenticateToken, fruitsController.getFruitById);

// Update Fruit by ID

router.patch('/:fruitId', upload.array("images"), authMiddleware.authenticateToken, fruitsController.updateFruit);

// Delete Fruit by ID
router.delete('/:fruitId', authMiddleware.authenticateToken, fruitsController.deleteFruit);

module.exports = router;