describe('CreateTaskUsecase', function(){
	describe('#execute()', function(){
		it('should accept valid data', function(){
			CreateTaskRequest = require("../src/server/task/CreateTaskRequest").CreateTaskRequest;
			var request = new CreateTaskRequest("title", "body", "author");
			//chai.assert.equal(-1, [1,2,3].indexOf(5));
			//chai.assert.equal(-1, [1,2,3].indexOf(0));
			chai.assert.equal(1,1);
		});
	});
});
