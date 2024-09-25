
# Rate Limiter in Node.js

A simple rate limiter in Node.js, using Redis for rate limiting and queueing, with two rate limiters (1 request per second, 20 requests per minute). No requests are dropped.

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v12 or higher)
- [Redis](https://redis.io/) (either locally or in the cloud)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/bitorsic/nodejs-rate-limiting.git
   cd nodejs-rate-limiting
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up Redis:
   - If you don't have Redis installed locally, you can follow the instructions [here](https://redis.io/download) for installation.
   - Alternatively, you can set up a cloud instance of Redis using services like [Redis Labs](https://redislabs.com/) or [AWS ElastiCache](https://aws.amazon.com/elasticache/).

4. Configure environment variables:
   - Copy the `.env.example` file to `.env` and update the values as needed:

   ```bash
   cp .env.example .env
   ```

## Usage

To start the application, run:

```bash
node index.js
```

Make sure the Redis instance is running and correctly configured.

Hit the endpoint using cURL:
```bash
curl -X POST http://localhost:3000/api/v1/task -H "Content-Type: application/json" -d '{"user_id": 123}'
```
(Change the user_id to test the rate limiting)

The logs should be saved to the file ``/logs/task.log``
## Rate Limiters

This project implements the following rate limiters:

- **1 request per second**
- **20 requests per minute**

No requests are dropped; they are queued and processed accordingly.

## Explanation

The directory tree with explanation is as follows (including only the necessary files):

```
.
├── controllers/
│   └── v1/
│       └── taskController.js - adding the task to queue upon hitting api
├── queues/
│   └── taskQueues.js - maintaining the queue for tasks for each user
├── routes/
│   └── v1/
│       └── task.js - mounting the taskController to /api/v1/task
├── utils/
│   ├── logger.js - logging to the /logs/ directory
│   ├── rateLimiter.js - logic for rate limiting
│   └── redis.js - exporting redis client for use by other modules
├── workers/
│   └── taskWorker.js - logic for executing tasks in queue
├── .env - environment variables for port and redis config
├── app.js - code run by each cluster node
├── config.js - default config for redis to be used by IORedis package
└── index.js - entry point, creating cluster and nodes
```