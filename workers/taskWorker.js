
// given function
const task = async (user_id) => {
	console.log(`${user_id}-task completed at-${Date.now()}`);
}

module.exports = async (job) => {
	const { user_id } = job.data;

	// TODO: create rateLimiter and check whether to allow or not

	await task(user_id);
}  