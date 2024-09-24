const Queue = require('bull');
const { bull_config } = require('../config');
const taskWorker = require('../workers/taskWorker');

// an object where key = user_id, value = instance of Bull
const taskQueues = {};

// method to enqueue a user's task
taskQueues.addTask = async (user_id) => {
	if (!taskQueues[user_id]) {
		taskQueues[user_id] = new Queue(`tasks:${user_id}`, bull_config);
		// attaching a processor
		taskQueues[user_id].process(taskWorker);
	}

	taskQueues[user_id].add({ user_id });
}

module.exports = {
	taskQueues,
}