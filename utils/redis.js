const IORedis = require('ioredis')
const { redis_config } = require('../config');

// redisClient to be used outside
let redisClient;

const connectRedis = async () => {
	try {
		console.log("Connecting to Redis...");
		redisClient = new IORedis(redis_config);

		redisClient.on('error', (err) => {
			console.error('Redis Client Error:', err);
		});

		await redisClient.ping();
		console.log("Redis Connection Successful");
	} catch (e) {
		console.log("Connection Failed");
	}
}

const getRedisClient = () => redisClient;

module.exports = {
	connectRedis,
	getRedisClient,
}