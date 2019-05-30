function postTaskBodyToJson(body) {
	return {
		title: body.title,
		body: body.body,
		author: body.author,
	};
}

class Controller {
	constructor(createTask, listTasks) {
		this.taskCreator = createTask;
		this.taskLister = listTasks;
	}
	createTask(request) {
		var requestModel = postTaskBodyToJson(request.body);
		return this.taskCreator.execute(requestModel);
	}
	listTasks(request) {
		return this.taskLister.execute();
	}
}

module.exports = Controller;