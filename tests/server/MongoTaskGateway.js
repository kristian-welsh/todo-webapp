var chai = require("chai");
var sinon = require("sinon");
var expect = chai.expect;

var path = "../../src/server/storage/";
var MongoTaskGateway = require(path + "MongoTaskGateway");

/*******************************************
 * WARNING: these tests clear the database *
 *******************************************/
describe('MongoTaskGateway', function(){
	describe('#store(),retrieve()', function(){
		it('should store and retrieve a task', function() {
			var gateway = new MongoTaskGateway();
			var task = {
				title: "title",
				body: "body",
				author: "author"
			};
			gateway.store(task);
			var retrieved = gateway.retrieveAll();
			console.log(retrieved);
			//task._id = "0";
			//retrieved[0]._id = "0";
			//expect(retrieved).to.be.eql([task]);
		});
	});
});
