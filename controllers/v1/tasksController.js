const { taskQueues } = require("../../queues/taskQueues");

const createTask = async (req, res) => {
	const { user_id } = req.body;

	taskQueues.addTask(user_id);

	res.status(200).send(
		`${user_id}-task received at ${Date.now()}\n`
	);
}

module.exports = {
	createTask,
};