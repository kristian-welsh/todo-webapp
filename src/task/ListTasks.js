class ListTasks {
	constructor(gateway) {
		this.gateway = gateway;
	}
	async execute() {
		return {tasks: await this.gateway.retrieveAll()};
	}
}

module.exports = ListTasks;