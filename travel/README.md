# skyscanner-travel-pkg

## Install
```sh
$ npm install --save skyscanner-travel-pkg
```

## Set Up
Retrieve Skyscanner API key: [Skyscanner Business](http://portal.business.skyscanner.net/en-gb/accounts/login/)

## Usage
var skyscanner = require('skyscanner-travel-pkg');

## Add API Details:
var apiKey = "123456789abcdefghikl"; 

var country = "IE";

var currency = "EUR";

var locale = "en-IE";

var originPlace = "LON";

var destinationPlace = "SFO";

var outboundPartialDate = "2017-05-20"; 

var inboundPartialDate = "2017-05-20"; 
	
```javascript
skyscanner.getBrowseQuotes(country, currency, locale, originPlace, destinationPlace, outboundPartialDate, inboundPartialDate, apiKey, 
	function(quotes,places,carriers,currencies){
		res.render('index', {quotes:quotes, places:places, carriers:carriers, currencies:currencies});	
});
```
