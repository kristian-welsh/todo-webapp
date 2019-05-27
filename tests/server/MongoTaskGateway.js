var chai = require("chai");
var sinon = require("sinon");
var expect = chai.expect;

var path = "../../src/server/storage/";
var MongoTaskGateway = require(path + "MongoTaskGateway");
var MongoConnection = require(path + "MongoConnection");

function dropDatabase() {
	MongoClient.connect("mongodb://localhost:27017")
		.then(db => db.dropDatabase());
}

/*******************************************
 * WARNING: these tests clear the database *
 *******************************************/
describe('MongoTaskGateway', function(){
	describe('#store(),retrieve()', function(){
		it('should store and retrieve a task', function(done) {
			this.timeout(4000);
			var connection = new MongoConnection("test");
			var gateway = new MongoTaskGateway(connection);

			var taskTask = {
				title: "title",
				body: "body",
				author: "author"
			};
			var expectedResult = {
				_id: "0",
				title: "title",
				body: "body",
				author: "author"
			};

			console.log("HEY1");
			gateway.store(taskTask)
			.then(() => gateway.retrieveAll())
			.then(queryResult => {
				queryResult[0]._id = 0;
				console.log("HEY2");
				console.log(queryResult);
				expect(queryResult).to.deep.equal(expectedResult);
			}).finally(() => {
				connection.drop();
				done();
			});

			//task._id = "0";
			//retrieved[0]._id = "0";
			//expect(retrieved).to.be.eql([task]);
		});
	});
});
