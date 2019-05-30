class CreateTask {
	constructor(gateway) {
		this.gateway = gateway;
	}
	execute(request) {
		console.log("request recieved by CreateTask: " + request);
		this.gateway.store(request);
		// todo: returns status pending until store promise resolves, then update with successful
		return {status: "successful"};
	}
}

module.exports = CreateTask; 