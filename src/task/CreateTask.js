class CreateTask {
	constructor(gateway) {
		this.gateway = gateway;
	}
	execute(request) {
		return this.gateway.store(request);
	}
}

module.exports = CreateTask; 