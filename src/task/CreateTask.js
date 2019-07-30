class CreateTask {
	constructor(gateway) {
		this.gateway = gateway;
	}
	async execute(request) {
		return { id: await this.gateway.store(request.task) };
	}
}

module.exports = CreateTask; 
