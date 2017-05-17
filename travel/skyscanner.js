var http = require('http'); // to use http server

//Set up global variables
var json ='';
var quotes ='';
var places ='';
var carriers ='';
var currencies ='';


function getBrowseQuotes(country, currency, locale, originPlace, destinationPlace, outboundPartialDate, inboundPartialDate, apiKey, callback){
    var options = {
        host: 'partners.api.skyscanner.net',
        path: "/apiservices/browsequotes/v1.0/" + country + "/" + currency + "/" + locale + "/" + originPlace +
            "/" + destinationPlace + "/" + outboundPartialDate + "/" + inboundPartialDate + "/" + "?apiKey=" + apiKey +".json"
    };

    var request = http.get(options, function (response){
        var body = '';

        response.on("data", function(chunk){ //get data from request. Use Chunk buffer because data is in binary form.
            body += chunk.toString('utf8'); // change to a string.
        });

        response.on("end", function(){  

            json = JSON.parse(body);    //change the string into JSON 
            //divide into sections 
            quotes =json['Quotes'];     
            places =json['Places'];
            carriers =json['Carriers'];
            currencies =json['Currencies'];

            for (i=0; i<json['Quotes'].length; i++){   //loop through the amount of quotes
                if(!json['Quotes'][i].OutboundLeg){    //if OutboundLeg of return journey doesn't exist             
                    delete json['Quotes'][i];          //delete the quote
                }else{
                    //----------------------------------------OUTBOUND-------------------------------------------------------------//
                    //Update OriginId with corresponding Airport Name
                    var temp = "";
                    var originId = json['Quotes'][i].OutboundLeg.OriginId;      //set originId to the current originId number
                    for(j=0;j<json['Places'].length;j++){                       //loop through places
                        if(json['Places'][j].PlaceId == originId){              //until originId matches placeId 
                            temp = json['Places'][j].Name;                      //set temp to airport name
                        }
                    }
                    json['Quotes'][i].OutboundLeg.OriginId = temp;              //set originId to airport name of origin.

                    //Update DestinationId with corresponding Airport Name
                    temp = "";
                    var destId = json['Quotes'][i].OutboundLeg.DestinationId;   //set destinationId to the current destinationId number
                    for(j=0;j<json['Places'].length;j++){                       //loop through places
                        if(json['Places'][j].PlaceId == destId){                //until destinationId matches placeId 
                            temp = json['Places'][j].Name;                      //set temp to airport name.
                        }
                    }
                    json['Quotes'][i].OutboundLeg.DestinationId = temp;         //set destinationId to airport name of destination.

                     //----------------------------------------INBOUND-------------------------------------------------------------//
                    if(json['Quotes'][i].InboundLeg){

                        //Update OriginId with corresponding Airport Name
                        var temp = "";      
                        var originId = json['Quotes'][i].InboundLeg.OriginId;   //set originId to the current originId number  
                        for(j=0;j<json['Places'].length;j++){                   //loop through places
                            if(json['Places'][j].PlaceId == originId){          //until originId matches placeId      
                                temp = json['Places'][j].Name;                  //set temp to airport name  
                            }
                        }
                        json['Quotes'][i].InboundLeg.OriginId = temp;           //set originId to airport name of origin.

                        //Update DestinationId with corresponding Airport Name
                        temp = "";
                        var destId = json['Quotes'][i].InboundLeg.DestinationId;//set destinationId to the current destinationId number
                        for(j=0;j<json['Places'].length;j++){                   //loop through places
                            if(json['Places'][j].PlaceId == destId){            //until destinationId matches placeId 
                                temp = json['Places'][j].Name;                  //set temp to airport name.
                            }
                        }
                        json['Quotes'][i].InboundLeg.DestinationId = temp;      //set destinationId to airport name of destination.
                    }
                }
            }

           callback(quotes,places,carriers,currencies);     //pass details after above is executed
        });

        response.on("error", function(error){
            console.log("ERROR: " + error.message);
        });
    });

    request.on("error", function(error){
        console.log("ERROR: " + error.message);
    });

    request.end();
}

module.exports.getBrowseQuotes = getBrowseQuotes;