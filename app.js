$(document).ready(function() {
	$('#tempo').select2()
	$('#graphe').select2()

	$.ajax({
		url : 'http://localhost:3000/getAllCrypto',
		type : 'GET',
		dataType : 'json',
		success : function(res, statut){ 
			$.each(res, (index, row) => {
				$('#crypto').append('<option value="'+row+'">'+row+'</option>')
			})

			getChart()

			$('#crypto').select2()
		}
	})
})

this.tempo = '1d'
this.crypt = 'ETHBTC'
this.graphe = 'line'

var changeTempo = function(value) {
	this.tempo = value
	getChart()
}

var changeCrypto = function(value) {
	this.crypt = value
	getChart()
}

var changeGraph = function(value) {
	this.graphe = value
	getChart()
}

var getChart = function() {

		console.log('http://localhost:3000/getChart/'+this.crypt+'/'+this.tempo)
        G=this.graphe
		$.ajax({
			url : 'http://localhost:3000/getChart/'+this.crypt+'/'+this.tempo,
			type : 'GET',
			dataType : 'json',
			success : function(res, statut){ 
				var myData = res
				var label = []
				var value = []

				$.each(myData, (index, row) => {
					label.push(row.openTime)
					value.push(row.closeValue)
				})

				createGraph(label, value,G)
			}
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
    
	// Fonction permettant de tracer des graphs
	var createGraph = function(labels,data,type){

		$("#graph-container").html("")
		$("#graph-container").html('<canvas id="graph" style="display: block; height: 169px; width: 339px;" width="678" height="338" ></canvas>')
		var ctx = document.getElementById("graph").getContext('2d')
		var myChart = new Chart(ctx, {
			    type: type,
			    data: {
			        labels: labels,
			        datasets: [{
			            label: '',
			            data: data,
			            backgroundColor:colorTab(data.length),
			            borderColor:colorTab(data.length),
			            borderWidth: 1
			        }]
			    },
			    options: {
                    /*elements: {
                        line: {
                            tension: 0, // disables bezier curves => on desactive l'arrondis (napporte pas dinfos pertinantes) de la courbe car on regarde linformation qui nous interesse que les pics
                        }
                    },*/
			        scales: {
			            yAxes: [{
			                ticks: {
			                    beginAtZero:true
			                }
			            }]
			        },
	                legend: {
	                    display: (type == 'doughnut' || type == 'pie' || type == 'line')
                    },
			    }
			})
	}
