var chai = require("chai");
var sinon = require("sinon");
var expect = chai.expect;

var path = "../src/storage/";
var MongoTaskGateway = require(path + "MongoTaskGateway");
var MongoConnection = require(path + "MongoConnection");

// db gives documents uuids, set to 0 for comparison
function assertEqual(expected, actual) {
	expected[0]._id = 0;
	actual[0]._id = 0;
	expect(actual).to.deep.equal(expected);
}

describe('MongoTaskGateway', function(){
	describe('#store(),retrieve()', function(){
		it('should store and retrieve a task', async function() {
			this.timeout(6000);
			// arrange
			var connection = new MongoConnection("test");
			var gateway = new MongoTaskGateway(connection);

			var input = {
				title: "title",
				body: "body",
				author: "author"
			};
			var expected = [{
				title: "title",
				body: "body",
				author: "author"
			}];
			await connection.drop();
			
			// act
			await gateway.store(input);
			var actual = await gateway.retrieveAll();
			
			// assert
			assertEqual(expected, actual);
				
			// teardown & end test
			await connection.drop();
		});
	});
});
