var chai = require("chai");
var sinon = require("sinon");
var expect = chai.expect;

var path = "../../src/storage/";
var MongoTaskGateway = require(path + "MongoTaskGateway");

var connection;
var data;
var findResults;

function assert_connection_established_and_disbanded_correctly() {
	chai.assert(connection.establish.calledOnce);
	chai.assert(connection.disband.calledOnce);
	chai.assert(connection.disband.calledAfter(connection.establish));
}

describe('MongoTaskGateway', function(){
	beforeEach(() => {
		connection = {
			establish: sinon.stub(),
			disband: sinon.spy(),
		};
		data = {
			insertOne: sinon.stub(),
			find: sinon.stub(),
		};
		findResults = {
			toArray: () => findResults
		};
		connection.establish.returns(Promise.resolve(data));
	});
	describe('#store()', function(){
		it('should store a task', async function() {
			var gateway = new MongoTaskGateway(connection);
			var task = {title: "title", body: "body", author: "author"};
			
			await gateway.store(task);
			
			sinon.assert.calledWith(data.insertOne, task);
			assert_connection_established_and_disbanded_correctly();
		});
	});
	describe('#retrieveAll()', function(){
		it('should retrieve tasks', async function() {
			data.find.returns(findResults);
			var gateway = new MongoTaskGateway(connection);
			
			var result = await gateway.retrieveAll();
			
			chai.assert.equal(result, findResults);
			assert_connection_established_and_disbanded_correctly();
		});
	});
});
