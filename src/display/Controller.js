function postTaskBodyToJson(body) {
	return {
		title: body.title,
		body: body.body,
		author: body.author,
	};
}

class Controller {
	constructor(createTask, listTasks, showTask) {
		this.taskCreator = createTask;
		this.taskLister = listTasks;
		this.taskShower = showTask;
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
}

module.exports = Controller;