const { Worker } = require('bullmq');
const { getRedisClient } = require('../utils/redis');
const { RATE_LIMITS, rateLimiter } = require('../utils/rateLimiter');

// given function
const task = async (user_id) => {
	console.log(`${user_id}-task completed at-${Date.now()}`);
};

const createWorker = (queueName) => {
	const connection = getRedisClient();

	const worker = new Worker(
		queueName,
		async (job) => {
			// destructure the user_id
			const { user_id } = job.data;

			// check the rateLimiter
			const { allowed, waitTime } = await rateLimiter(user_id);

			// if not allowed, add delay
			if (!allowed) {
				await worker.rateLimit(waitTime * 1000); // since it's in ms
				throw Worker.RateLimitError(); // don't fail, just wait
			}

			// now execute the given task function
			await task(user_id);
		},
		{
			connection,
			limiter: {
				// needed for custom rate limiting to work,
				// hence using this for per second limiting
				max: RATE_LIMITS.perSecond,
				duration: 1000,
			},
		},
	);
};

module.exports = {
	createWorker
}