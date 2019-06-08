const express = require('express');
const hbs = require('express-handlebars');

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
		// parsing forms from application/x-www-form-urlencoded to req.body
		this.app.use(express.urlencoded({ extended: true }));
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