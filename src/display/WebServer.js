const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');

const port = 3000;

// middleware setup
class WebServer {
	constructor(router) {
		this.app = express();
		// set up view engine
		const hbsOptions = {
			extname: 'hbs',
			defaultLayout: 'layout',
			layoutsDir: __dirname + '/views/layouts/',
		};
		this.app.engine('hbs', hbs(hbsOptions));
		this.app.set('views', __dirname + '/views/');
		this.app.set('view engine', 'hbs');

		// middleware 
		// parsing json into req.body for rest requests
		this.app.use(bodyParser.json());
		// serving static content like css and images
		this.app.use(express.static(__dirname + '/static'));
		// routing
		this.app.use(router);
	}
	
	start() {
		this.app.listen(port, () => console.log('Todo webapp running'));
	}
}

module.exports = WebServer;