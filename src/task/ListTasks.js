class ListTasks {
	constructor(gateway) {
		this.gateway = gateway;
	}
	execute() {
		return this.gateway.retrieveAll();
	}
}

module.exports = ListTasks;