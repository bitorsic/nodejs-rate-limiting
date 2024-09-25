require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const { connectRedis } = require('./utils/redis');

// mounting all routes to '/api'
app.use('/api', require('./routes'));


(async () => {
	await connectRedis();

	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
})()