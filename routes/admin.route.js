const express = require('express');
const router = express.Router();

const adminMiddleware = require('../middlewares/admin.middleware')
const adminController = require('../controllers/admin.controller')

router.get('/', adminController.login);
router.post('/auth', adminController.auth)
router.get('/users', adminMiddleware.adminAuth, adminController.users)
router.post('/users', adminMiddleware.adminAuth, adminController.addUser)
router.get('/users/delete/:userId', adminController.deleteUser)

router.get('/matches', adminMiddleware.adminAuth, adminController.matches)
module.exports = router