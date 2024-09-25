const { Queue } = require('bullmq');
const { createWorker } = require('../workers/taskWorker');
const { getRedisClient } = require('../utils/redis');

// an object where key = user_id, value = instance of Bull
const taskQueues = {};

// method to enqueue a user's task
taskQueues.addTask = async (user_id) => {
	const connection = getRedisClient();

	if (!taskQueues[user_id]) {
		const queueName = `tasks?${user_id}`;

		taskQueues[user_id] = new Queue(queueName, {
			// passing the redisClient object
			connection,
		});

		createWorker(queueName);
	}

	await taskQueues[user_id].add('job_name', { user_id });
}

module.exports = {
	taskQueues,
}