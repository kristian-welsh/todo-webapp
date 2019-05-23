var chai = require("chai");
var sinon = require("sinon");

var path = "../../src/server/task/";
var CreateTaskRequest = require(path + "CreateTaskRequest");
var CreateTaskResponse = require(path + "CreateTaskResponse");
var CreateTask = require(path + "CreateTask");
var TaskGateway = require(path + "TaskGateway");

describe('CreateTaskUsecase', function(){
	describe('#execute()', function(){
		it('should accept valid task', function(){
			var request = new CreateTaskRequest("title", "body", "author");
			var gateway = new TaskGateway();
			var feature = new CreateTask(gateway);
			
			var response = feature.execute(request);
			
			chai.assert.equal(response.status, "successful");
		});
		it('should persist tasks', function(){
			var expectedTask = {
				title: "title",
				body: "body",
				author: "author"
			};
			var request = new CreateTaskRequest("title", "body", "author");
			var gateway = new TaskGateway();
			var feature = new CreateTask(gateway);
			var mock = sinon.mock(gateway);
			mock.expects('store').once().withArgs(expectedTask);
			
			var response = feature.execute(request);
			
			mock.restore();
			mock.verify();
		});
	});
});
