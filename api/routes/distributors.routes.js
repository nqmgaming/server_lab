const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer.middleware');

const distributorsController = require('../controllers/distributors.controller');
const authMiddleware = require('../middlewares/auth.middleware');
require('dotenv').config();
// Create Distributor
router.post('/create', authMiddleware.authenticateToken, upload.single('image'), distributorsController.createDistributor);

// Search Distributors
router.get('/search', authMiddleware.authenticateToken, distributorsController.searchDistributors);

// Get Distributors
router.get('/', authMiddleware.authenticateToken, distributorsController.getDistributors);

// Get Distributor by ID
router.get('/:distributorId', authMiddleware.authenticateToken, distributorsController.getDistributorsById);

// Update Distributor by ID
router.patch('/:distributorId', authMiddleware.authenticateToken, distributorsController.updateDistributor);

// Delete Distributor by ID
router.delete('/:distributorId', authMiddleware.authenticateToken, distributorsController.deleteDistributor);

module.exports = router;