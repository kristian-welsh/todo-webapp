const express = require('express');
const hbs = require('express-handlebars');

const app = express();
const port = 3000;

// view engine setup
const hbsOptions = {
	extname: 'hbs',
	defaultLayout: 'layout',
	layoutsDir: __dirname + '/views/layouts/',
};
app.engine('hbs', hbs(hbsOptions));
app.set('views', __dirname + '/views/');
app.set('view engine', 'hbs');

// serve requests
app.get('/', (req, res) => {
	// in the future call applicaiton code based on req, then from
	// response, build the view data in a viewmodel and pass here
	var viewData = {title: 'Index', message: 'Hello, world!'};
	res.render('index', viewData);
});

// start server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

