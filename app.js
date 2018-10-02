var curl = require("curl")
var fs = require("fs")
var moment = require("moment")

var values = new Map()


function getAllPrice() {
	curl.get('https://www.binance.com/api/v1/ticker/allPrices', (err, res, body) => {
	    if(err)
	        console.log(err)
        JSON.parse(body).forEach(e => {
            values.set(e.symbol, e.price)
        })
	})

	return values
}

function getChard(symbol, interval) {
	curl.get('https://www.binance.com/api/v1/klines?symbol='+symbol+'&interval='+interval, (err, res, body) => {
	    if(err)
	        console.log(err)
	    return body
	})
}

 // Fonction d'affichage des statistiques
function display() {
	var json = JSON.parse(response);
	var obj = json[0];
	createGraph(obj.labels,obj.values,typeGraph);
};
