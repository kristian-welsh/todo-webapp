class CreateTask {
	constructor(gateway) {
		this.gateway = gateway;
	}
	execute(request) {
		this.gateway.store(request);
		return {status: "successful"};
	}
}

module.exports = CreateTask; 