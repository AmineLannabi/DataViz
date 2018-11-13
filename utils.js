this.tempo = '1d'
this.crypt = ['ETHBTC']
this.graphe = 'line'
this.chart = {};


// fonction pour generer des couleurs aleatoirement
function randomColor() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgba(" + r + "," + g + "," + b + ", 0.5)";
}

// Creation du tableau de couleur
function colorTab(a) {
    var col = [];
    for(i=0;i<a;i++){
        col.push(randomColor());}
    return col;
}


// Cette fonction est horrible -_-'
function mean(d){
    var tmp = 0;
    var tab =[];
    $.each(d, (index, row) => {
        tmp += JSON.parse(row)
    })
    tmp /= d.length
    $.each(d, (index, row) => {
        tab.push(tmp)
    })
    return tab;
}

var changeTempo = function(value) {
	this.tempo = value
	getChart()
}

var changeCrypto = function(value) {
	this.crypt = $('#crypto').val()
	getChart()
}

// function who add data to chart and update it
function addData(chart, label, data) {
    chart.data.labels = label;
    chart.data.datasets = data
    chart.update();
}