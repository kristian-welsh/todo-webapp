async function createNewTask() {
	var titleElement = document.getElementById('new-task-title');
	var bodyElement = document.getElementById('new-task-body');
	var authorElement = document.getElementById('new-task-author');
	var task = {
		title: titleElement.value,
		body: bodyElement.value,
		author: authorElement.value,
	};
	
	// todo: display pending status
	// ...
	
	// Store new task in db and fetch id
	var newTaskID = await postTask(task);
	
	// todo: display creation complete status
	var taskHTML = await getTaskHTML(newTaskID);
	var taskContainer = document.getElementById('task-container');
	taskContainer.innerHTML += taskHTML;
}

async function postTask(task) {
	var response = await ajaxPromise('POST', '/api/task', task);
	return JSON.parse(response).id;
}

async function getTaskHTML(taskid) {
	var response = await ajaxPromise('GET', '/api/task/' + taskid + '/html', null);
	return JSON.parse(response).html;
}

function ajaxPromise(method, uri, body) {
	return new Promise((resolve, reject) => {
		var request = openNewJsonRequest();
		request.onload = () => {
			(request.status === 201) ? resolve(request.response) : reject(request.status);
		};
		var jsonBody = JSON.stringify(body);
		request.send(jsonBody);
	});
}

function openNewJsonRequest() {
	var request = new XMLHttpRequest();
	request.open(method, uri);
	request.setRequestHeader("Content-Type", "application/json");
	return request;
}
