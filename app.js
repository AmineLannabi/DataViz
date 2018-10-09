$(document).ready(function() {
	$('#tempo').select2()
	$('#graphe').select2()
	$('#crypto').select2({
		placeholder: "Select a cryptocurrency"
	})

	$.ajax({
		url : 'http://localhost:3000/getAllCrypto',
		type : 'GET',
		dataType : 'json',
		success : function(res, statut){ 
			$.each(res, (index, row) => {
				$('#crypto').append('<option value="'+row+'">'+row+'</option>')
			})

			getChart()
		}
	})
})

this.tempo = '1d'
this.crypt = ['ETHBTC']
this.graphe = 'line'

var changeTempo = function(value) {
	this.tempo = value
	getChart()
}

var changeCrypto = function(value) {
	this.crypt = $('#crypto').val()

	getChart()
}

var changeGraph = function(value) {
	this.graphe = value
	getChart()
}


function formatData() {
	var cryptoSize = this.crypt.length

	return new Promise((resolve, reject) => {
		var datasets = []
		var time = []

		$.each(this.crypt, (i, r) => {
			var myObj = {}
			console.log('http://localhost:3000/getChart/'+r+'/'+this.tempo)
			$.ajax({
				url : 'http://localhost:3000/getChart/'+r+'/'+this.tempo,
				type : 'GET',
				dataType : 'json',
				success : function(res, statut){ 
					var myData = res
					var value = []

					$.each(myData, (index, row) => {
						time.push(row.openTime)
						value.push(row.closeValue)
					})

					myObj = {
			            label: r,
			            data: value,
			            backgroundColor:colorTab(value.length),
			            borderColor:colorTab(value.length),
			            borderWidth: 1
				    }

					datasets.push(myObj)

					if(datasets.length === cryptoSize) {
						resolve([time, datasets])
					} 
				}
						})
		})
	})
}


var getChart = function() {		

	formatData().then(rs => {
		createGraph(rs[0], rs[1], this.graphe)
	})
}

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

// Fonction permettant de tracer des graphs
var createGraph = function(labels,datasets,type){

	$.each(datasets, (i, r) => {
		datasets.push({
            label: 'Mean ' + r.label,
            data: mean(r.data),
            // Changes this dataset to become a line
            type: 'line',
            fill:false,
            borderColor:colorTab(r.data.length)
		})
	})

	$("#graph-container").html("")
	$("#graph-container").html('<canvas id="graph" style="display: block; height: 169px; width: 339px;" width="678" height="338" ></canvas>')
	var ctx = document.getElementById("graph").getContext('2d')
	var myChart = new Chart(ctx, {
		    type: type,
		    data: {
		        labels: labels,
		        datasets: datasets
		    },
		    options:  {
		    /*elements: {
                elements: { point: { radius: 0 } }
                line: {
                    tension: 0, // disables bezier curves => on desactive l'arrondis (napporte pas dinfos pertinantes) de la courbe car on regarde linformation qui nous interesse que les pics
                }
            },*/
	            elements: { point: { radius: 0 } },
	            responsive: true,
	            title: {
	                display: true,
	                text: 'Crypto chart'
	            },
	            scales: {
	                xAxes: [{
	                    display: true,
	                    scaleLabel: {
	                        display: true,
	                        labelString: 'Month'
	                    }
	                }],
	                yAxes: [{
	                    display: true,
	                    scaleLabel: {
	                        display: true,
	                        labelString: 'Value'
	                    }
	                }]
	            }
	                /*legend: {
	                    display: (type == 'doughnut' || type == 'pie' || type == 'line')
	                },*/
            }
		})
}
