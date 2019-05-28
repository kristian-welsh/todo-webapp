const MongoClient = require('mongodb').MongoClient;

const dbUrl = 'mongodb://localhost:27017';

class MongoConnection {
	constructor(dbName) {
		this.dbName = dbName;
	}
	// Returns the specified collection from the configured db.
	// This object must now be disbanded after use.
	establish(collectionName = 'documents') {
		this._clearClient();
		return MongoClient.connect(dbUrl, {useNewUrlParser: true})
			.then(client => {
				this.client = client;
				return this.client.db(this.dbName).collection(collectionName);
			});
	}
	// Closes the connection to avoid network usage leaks
	disband() {
		this.client.close();
		this.client = null;
	}
	drop() {
		return this.establish('foo')
		.then(() => this.client.db(this.dbName).dropDatabase())
		.finally(() => this.disband());
	}
	
	
	_clearClient() {
		if(this.client !== null && this.client !== undefined)
			this.disband();
	}
}

module.exports = MongoConnection;