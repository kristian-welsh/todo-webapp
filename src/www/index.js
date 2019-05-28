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
	res.render('index', {title: 'Index', message: 'Hello, world!'});
});

// start server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

