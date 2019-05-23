class CreateTaskRequest {
	constructor(title, body, author) {
		this.title = title;
		this.body = body;
		this.author = author;
	}
}

module.exports = CreateTaskRequest; 