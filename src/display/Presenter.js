const Handlebars = require('handlebars');
const fs = require('fs');

function loadFileString(path) {
	return new Promise((resolve, reject) => {
		fs.readFile(path, (err, data) => {
			if(err)
				reject(err);
			else
				resolve(data.toString());
		});
	});
}

class Presenter {
	createViewModel(...responseModels) {
		var viewModel = {};
		responseModels.forEach(model => viewModel = {...viewModel, ...model});
		return viewModel;
	}
	
	async presentTask(task) {
		var hbs;
		try {
			hbs = await loadFileString('./src/display/views/task.hbs');
		} catch(err) {
			console.log("promise rejected: ");
			console.log(err);
			return null;
		}
		var template = Handlebars.compile(hbs);
		var html = template(task);
		return html;
	}
}

module.exports = Presenter;
