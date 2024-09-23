const createTask = async (req, res) => {
	const userID = req.body.userID

	res.status(200).send(
		`${userID}-task received at ${Date.now()}`
	)
}

module.exports = {
	createTask,
}