this.tempo = '1M'
this.crypt = ['BTCUSDT']
this.graphe = 'line'
this.chart = {};


// fonction pour generer des couleurs aleatoirement
function randomColor() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgba(" + r + "," + g + "," + b + ", 0.7)";
}

// Creation du tableau de couleur
function colorTab(a) {
    var col = [];
    for(i=0;i<a;i++)
        col.push(randomColor())
    return col;
}


function mean(d){
    var tmp = 0;
	var tab =[];
    $.each(d, (index, row) => {
		mG=parseFloat(d[index-1])+parseFloat(row)+parseFloat(d[index+1])
		mG/=3
		tab.push(mG)
	})
	tab[0]=parseFloat(d[0])
	tab[tab.length-1]=parseFloat(d[d.length-1])
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

function computeMean(data) {
    $.each(data, (i, r) => {
		data.push({
            label: 'Mean ' + r.label,
            data: mean(r.data),
            // Changes this dataset to become a line
            type: 'line',
            borderDash: [5, 5],
            fill: '-1',
            borderColor:colorTab(r.data.length)
		})
    })

    return data
}

// function who add data to chart and update it
function addData(chart, label, data,th) {
    data = computeMean(data)
    chart.data.labels = label;
    chart.data.datasets = data;
    chart.options.scales.xAxes[0].scaleLabel.labelString = th
    chart.update();
}




var changeGraph = function(value) {
    this.graphe = value
    this.chart = {}
    getChart()
}