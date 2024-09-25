// this will contain the default config

const config = {
	redis_config: { // for use by redis package
		host: process.env.REDIS_HOST || '127.0.0.1',
		port: process.env.REDIS_PORT || 6379,
		password: process.env.REDIS_PASSWORD || '',
		maxRetriesPerRequest: null, // needed for bullmq
	},
};

module.exports = config;