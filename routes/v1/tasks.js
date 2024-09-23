const express = require('express')
const router = express.Router()
const { tasksController } = require('../../controllers/v1')

router.post('/', tasksController.createTask)

module.exports = router