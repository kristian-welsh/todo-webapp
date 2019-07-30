class ShowTask {
	constructor(gateway) {
		this.gateway = gateway;
	}
	async execute(model) {
		return { task: await this.gateway.retrieve(model.id) };
	}
}

module.exports = ShowTask;
