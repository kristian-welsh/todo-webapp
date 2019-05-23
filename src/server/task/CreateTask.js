var CreateTaskResponse = require("./CreateTaskResponse");
class CreateTask {
	constructor(gateway) {
		this.gateway = gateway;
	}
	execute(request) {
		var task = {
			title: request.title,
			body: request.body,
			author: request.author
		};
		this.gateway.store(task);
		return new CreateTaskResponse("successful");
	}
}

module.exports = CreateTask; 