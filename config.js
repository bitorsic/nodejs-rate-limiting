// this will contain the default config for redis
// to be used by redis and bull packages

const config = {
	redis_config: { // for use by redis package
		socket: {
			host: process.env.REDIS_HOST || '127.0.0.1',
			port: process.env.REDIS_PORT || 6379,
		},
		password: process.env.REDIS_PASSWORD || '',
	},
	bull_config: { // for use by bull package
		redis: {
			host: process.env.REDIS_HOST || '127.0.0.1',
			port: process.env.REDIS_PORT || 6379,
			password: process.env.REDIS_PASSWORD || '',
		}
	}
};

module.exports = config;