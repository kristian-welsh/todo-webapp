class ShowTask {
	constructor(gateway) {
		this.gateway = gateway;
	}
	async execute(id) {
		return await this.gateway.retrieve(id);
	}
}

module.exports = ShowTask;