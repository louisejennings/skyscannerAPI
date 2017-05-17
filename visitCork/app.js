//Import modules required for the project
var skyscanner = require('skyscanner-travel-pkg');	
var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var expressHandlebars = require('express-handlebars');
var expressValidator = require('express-validator');
var expressSession = require('express-session');

//Define routes
var routes = require('./routes/index');

//Initialize an Express Application
var app = express();

var expH = expressHandlebars.create({
    layoutsDir:__dirname + '/views/layouts/'
});

//View Engine
app.engine('handlebars', expH.engine);
app.set('views', path.join(__dirname, 'views')); //folder called 'views'
app.engine('handlebars', expressHandlebars({defaultLayout:'layout'})); //set handlebars as the app.engine and the default layout file is 'layout.handlebars'
app.set('view engine', 'handlebars'); //set the view engine to handlebars

//BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Declare public directory to be used as a store for static files
app.use(express.static(path.join(__dirname, 'public'))); 

//Express Session (Middleware for Express Session)
app.use(expressSession({
	secret: 'SkyScanner',
	saveUninitialized: true,
	resave: true
}));

//Express Validator (Middleware for Express Validator)
app.use(expressValidator({
	errorFormatter: function(param, msg, value){
		var namespace = param.split('.'),
		root = namespace.shift(),
		formParam = root;

		while(namespace.length){
			formParam += '[' + namespace.shift() + ']';
		}
		return{
			param : formParam,
			msg : msg,
			value : value
		};
	}
}));

//Helpers
var helpers = require('./middleware/helpers');

//Middleware for route files
app.use('/', routes); //brings you to index file

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


module.exports = app;
