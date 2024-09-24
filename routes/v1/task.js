const express = require('express')
const router = express.Router()
const { tasksController } = require('../../controllers/v1')

// handling POST request to '/api/v1/task' 
router.post('/', tasksController.createTask)

module.exports = router