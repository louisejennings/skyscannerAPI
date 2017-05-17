var express = require('express');
var router = express.Router();
var Handlebars = require('handlebars');


/* ----- Equal Helper ------------*/
Handlebars.registerHelper('equal', function(lvalue, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Need 2 parameters");
    if( lvalue!=rvalue ) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
});

/* ----- Modify Date Format------------*/
Handlebars.registerHelper('date', function(quotes) {
   var temp = quotes;
   var dateOnly =temp.substring(0, 10);

  	function reverse(dateOnly){	
    	return dateOnly.split("-").reverse().join("-");	//reverse each section divided by -
	}

	date=reverse(dateOnly);	//set reveresed dateOnly to date
  		
  	return date;
});