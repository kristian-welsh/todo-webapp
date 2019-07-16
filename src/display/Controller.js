function postTaskBodyToJson(body) {
	return {
		title: body.title,
		body: body.body,
		author: body.author,
	};
}

class Controller {
	constructor(createTask, listTasks, showTask, deleteTask) {
		this.taskCreator = createTask;
		this.taskLister = listTasks;
		this.taskShower = showTask;
		this.taskDeleter = deleteTask;
	}
	createTask(request) {
		var requestModel = postTaskBodyToJson(request.body);
		return this.taskCreator.execute(requestModel);
	}
	listTasks(request) {
		return this.taskLister.execute();
	}	
	showTask(id) {
		return this.taskShower.execute(id);
	}
	deleteTask(id) {
		this.taskDeleter.execute(id);
	}
}

module.exports = Controller;
