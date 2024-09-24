require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const { createClient } = require('redis');
const { redis_config } = require('./config')

// mounting all routes to '/api'
app.use('/api', require('./routes'));


(async () => {
	try {
		console.log("Connecting to Redis...");
		const client = createClient(redis_config);

		client.on('error', (err) => {
			console.error('Redis Client Error:', err);
		});

		await client.connect();
		console.log("Redis Connection Successful");

		const PORT = process.env.PORT || 3000;
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	} catch (e) {
		console.log("Connection Failed");
	}
})()