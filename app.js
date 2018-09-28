var curl = require("curl")
var fs = require("fs")
var moment = require("moment")

var values = new Map()
var crypto = new Map()
var montantEth = 100
var montantBtc = 1
var benef = 0
var montantBnb = 100
var montantUsd = 100

setInterval(() => {
curl.get('https://www.binance.com/api/v1/ticker/allPrices', (err, res, body) => {
    if(err)
        console.log(err)
        JSON.parse(body).forEach(e => {
            values.set(e.symbol, e.price)
        })
})


}, 10000)


// test https://www.binance.com/api/v1/klines?symbol=MFTBNB&interval=1M