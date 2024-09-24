const express = require('express')
const router = express.Router()

// mounting the router from task route to '/api/v1/task'
// we can mount more v1 routes as the project grows
router.use('/task', require('./task'))

module.exports = router