require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const { createClient } = require('redis');


app.use('/api', require('./routes'));


(async () => {
	try {
		console.log("Connecting to Redis...");
		const client = createClient({
			socket: {
				host: process.env.REDIS_HOST || '127.0.0.1',
				port: process.env.REDIS_PORT || 6379,
			},
			password: process.env.REDIS_PASSWORD || '',
		})

		client.on('error', (err) => {
			console.error('Redis Client Error:', err);
		});

		await client.connect();
		console.log("Redis Connection Successful");

		const PORT = process.env.PORT || 8080;
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	} catch (e) {
		console.log("Connection Failed");
	}
})()