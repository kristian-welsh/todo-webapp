class DeleteTask {
	constructor(gateway) {
		this.gateway = gateway;
	}
	execute(id) {
		this.gateway.delete(id);
	}
}

module.exports = DeleteTask; 
