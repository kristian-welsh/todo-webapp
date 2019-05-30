class CreateTask {
	constructor(gateway) {
		this.gateway = gateway;
	}
	execute(request) {
		console.log("request recieved by CreateTask: " + request);
		return this.gateway.store(request);
	}
}

module.exports = CreateTask; 