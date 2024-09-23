const cluster = require('cluster')

const numCPUs = 2 // as stated

if (cluster.isPrimary) {
	console.log(`Primary ${process.pid} is running...`)

	// fork workers
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork()
	}

	cluster.on('exit', (worker, code, signal) => {
		console.log(`Worker ${worker.process.pid} died`)
	})
} else {
	console.log(`Worker ${process.pid} is running...`)
	require('./app')
}
