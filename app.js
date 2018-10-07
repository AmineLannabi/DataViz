$(document).ready(function() {
	$('#tempo').select2()


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


var changeTempo = function(value) {
	this.tempo = value
	getChart()
}

var changeCrypto = function(value) {
	this.crypt = value
	getChart()
}

var getChart = function() {

		console.log('http://localhost:3000/getChart/'+this.crypt+'/'+this.tempo)

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


				createGraph(label, value, 'line')
			}
		})
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
			            backgroundColor: [
			                'rgba(255, 99, 132, 0.2)',
			                'rgba(54, 162, 235, 0.2)',
			                'rgba(255, 206, 86, 0.2)',
			                'rgba(75, 192, 192, 0.2)',
			                'rgba(153, 102, 255, 0.2)',
			                'rgba(255, 159, 64, 0.2)'
			            ],
			            borderColor: [
			                'rgba(255,99,132,1)',
			                'rgba(54, 162, 235, 1)',
			                'rgba(255, 206, 86, 1)',
			                'rgba(75, 192, 192, 1)',
			                'rgba(153, 102, 255, 1)',
			                'rgba(255, 159, 64, 1)'
			            ],
			            borderWidth: 1
			        }]
			    },
			    options: {
			        scales: {
			            yAxes: [{
			                ticks: {
			                    beginAtZero:true
			                }
			            }]
			        },
	                legend: {
	                    display: (type == 'doughnut' || type == 'pie')
	                },
			    }
			})
	}
