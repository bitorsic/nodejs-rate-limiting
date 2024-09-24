const express = require('express')
const router = express.Router()

// mounting all v1 routes to '/api/v1'
router.use('/v1', require('./v1'))

module.exports = router