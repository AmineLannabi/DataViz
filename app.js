var curl = require("curl")
var fs = require("fs")
var moment = require("moment")
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/getChart/:crypto/:time', (req, res) => {
	var crypto = req.params.crypto
	var time = req.params.time

	getChart(crypto, time).then(chart => {
		console.log(chart)
		res.send(chart)
	})
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})



function getAllPrice() {
	curl.get('https://www.binance.com/api/v1/ticker/allPrices', (err, res, body) => {
	    if(err)
	        console.log(err)

	    var myObj = []

        JSON.parse(body).forEach(row => {
            myObj.push(row)
        })

        return myObj
	})
}

function getChart(symbol, interval) {
	return new Promise((resolve, reject) => {
		curl.get('https://www.binance.com/api/v1/klines?symbol='+symbol+'&interval='+interval, (err, res, body) => {
		    if(err)
		        console.log(err)

		    var myObj = []

		    body = JSON.parse(body)

		    try {
			    body.forEach(row => {
			    	let obj = {}

			    	obj.openTime  			= row[0]
			    	obj.openValue 			= row[1]
			    	obj.high 				= row[2]
			    	obj.low 				= row[3]
			    	obj.closeValue 			= row[4]
			    	obj.volume 				= row[5]
			    	obj.closeTime 			= row[6]
			    	obj.assetVolume 		= row[7]
			    	obj.nbTrades 			= row[8]
			    	obj.BaseAssetVolume 	= row[9]
			    	obj.QuoteAssetVolume 	= row[10]
			    	// obj.ignore 				= row[11] // USELESS VALUE

			    	myObj.push(obj)
			    })
			} catch (e) {
				console.log(body)
				console.log(e)
				reject('error', e)
			}

		    resolve(myObj)

		})
	})
}

