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
		this.methodMapping = new Map([
			['create', this.taskCreator],
			['list', this.taskLister],
			['show', this.taskShower],
			['delete', this.taskDeleter]
		]);
	}
	handleRequest(method, request) {
		let obj = this.methodMapping.get(method);
		return obj.execute(request);
	}
}

module.exports = Controller;
