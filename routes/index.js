const express = require('express');
const router = express.Router()

const adminRoute = require('./admin.route')

router.use('/admin', adminRoute)

module.exports = router