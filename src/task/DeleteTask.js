class DeleteTask {
	constructor(gateway) {
		this.gateway = gateway;
	}
	execute(request) {
		this.gateway.delete(request.id);
	}
}

module.exports = DeleteTask; 
