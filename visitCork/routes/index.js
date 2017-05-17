var express = require('express'); //include express
var router = express.Router();	//set up Router
var skyscanner = require('skyscanner-travel-pkg'); //include skyscanner module

//Details for API
var country = "IE";
var currency = "EUR";
var locale = "en-IE";
var apiKey = "lo808288314597893113343846709729";

var originPlace = ""; //LON
var destinationPlace = ""; //SFO
var outboundPartialDate = ""; //2017-05-20
var inboundPartialDate = ""; //2017-05-22

//Get Details from FORM
router.post('/skyscanner',function (req, res) {
	originPlace = req.body.originPlace;	//get FROM from form
	destinationPlace = req.body.destinationPlace; //get TO from form
	outboundPartialDate = req.body.outboundPartialDate; //get Departure Date from form
	inboundPartialDate = req.body.inboundPartialDate; //get Return Date from form

	//use getBrowseQuotes module
	skyscanner.getBrowseQuotes(country, currency, locale, originPlace, destinationPlace, outboundPartialDate, inboundPartialDate, apiKey, 
		function(quotes,places,carriers,currencies){
			res.render('index', {quotes:quotes, places:places, carriers:carriers, currencies:currencies});	//render index.handlebars view
	});
});

//Homepage
router.get('/', function(req, res){ //Homepage
	res.render('index'); 
});
module.exports = router; 




