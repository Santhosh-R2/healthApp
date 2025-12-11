const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/save-health', authMiddleware, userController.saveHealthDetails);
router.get('/health-details', authMiddleware, userController.getHealthDetails);
router.post('/change-password', authMiddleware, userController.changePassword);
router.post('/logout', userController.logoutUser);

module.exports = router;