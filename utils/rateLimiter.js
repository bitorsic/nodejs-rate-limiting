const { getRedisClient } = require("./redis");

const RATE_LIMITS = {
	perSecond: 1,
	perMinute: 20,
};

// define per minute limit here, per second limit in worker
const rateLimiter = async (userId) => {
	const redisClient = getRedisClient();

	const keyMinute = `rate:${userId}:minute`;

	const [currentMinute, ttlMinute] = await redisClient
		.multi()
		.incr(keyMinute)
		.ttl(keyMinute)
		.exec()
		.then(results => {
			if (results[1][1] === -1) { // checking if ttl is unset
				redisClient.expire(keyMinute, 60);
			}
			return [results[0][1], results[1][1]];
		});

	if (currentMinute > RATE_LIMITS.perMinute) {
		return { allowed: false, waitTime: ttlMinute };
	}
	
	return { allowed: true, waitTime: 0 };
};

module.exports = {
	RATE_LIMITS,
	rateLimiter,
};
