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
	
	var taskHTML = await getTaskHTML(newTaskID);
	var taskContainer = document.getElementById('task-container');
	taskContainer.innerHTML += taskHTML;
}

async function postTask(task) {
	var response = await ajaxPromise('POST', '/api/task', { task: task });
	return JSON.parse(response).id;
}

async function getTaskHTML(taskid) {
	var response = await ajaxPromise('GET', '/api/task/' + taskid + '/html', null);
	return JSON.parse(response).html;
}

function deleteElement(element) {
	element.parentElement.removeChild(element);
}

async function deleteTask(element, taskid) {
	// todo: display pending status
	// ...
	
	await ajaxPromise('DELETE', '/api/task/' + taskid, null);

	// delete ui element
	let taskCard = element.parentElement.parentElement;
	deleteElement(taskCard);
}

function wasSuccessful(status) {
	return status >= 200 && status < 300;
}

function ajaxPromise(method, uri, body) {
	if(body === null) body = {};
	return new Promise((resolve, reject) => {
		var request = openNewJsonRequest(method, uri);
		request.onload = () => {
			if(wasSuccessful(request.status))
				resolve(request.response);
			else
				reject(request.status);
		};
		var jsonBody = JSON.stringify(body);
		request.send(jsonBody);
	});
}

function openNewJsonRequest(method, uri) {
	var request = new XMLHttpRequest();
	request.open(method, uri);
	request.setRequestHeader("Content-Type", "application/json");
	return request;
}
