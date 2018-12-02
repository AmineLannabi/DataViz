var getChart = function() {		
	formatData().then(rs => {
		if(this.graphe === 'pie')
			formatDataPie(rs)
		else {
        	if(Object.keys(this.chart).length  !== 0)
            	addData(this.chart, rs[0], rs[1],this.tempo)
        	else
				createGraph(rs[0], rs[1], rs[2], this.graphe, this.tempo)
		}
	})
}

var createPieGraph = function(datasets, labels, color) {
	$("#graph-container").html("")
	$("#graph-container").html('<canvas id="graph" style="display: block; height: 169px; width: 339px;" width="678" height="338" ></canvas>')
	var ctx = document.getElementById("graph").getContext('2d')
	var myChart = new Chart(ctx,{
		type: 'pie',
		data: {
			datasets: datasets,
			labels: labels
			// backgroundColor: color
		}
		// options: {options}
	});
}

// Fonction permettant de tracer des graphs
var createGraph = function(labels, datasets, volume,type, th){
	datasets = computeMean(datasets)
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
				pan: {
					enabled: true,
					mode: "xy",
					speed: 10,
					threshold: 10,
					limits: {
						max: 10,
						min: 0.5
					  }
				  },
				  zoom: {
					enabled: true,
					//drag: true,
					mode: "xy",
					limits: {
					  max: 10,
					  min: 0.5
					}
				  },
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
	                text: datasets[0].label + " : " + datasets[0].data[datasets[0].data.length-1]
				},
				tooltips: {
					mode: 'index',
					intersect: false,
					backgroundColor: 'rgb(0, 130, 0)',
					cornerRadius:20,
					callbacks: {
						afterBody: function(t, d) {
						   return '    Volume : ' + volume[t[0].index] 
						}
					 }
				  },
	            scales: {
	                xAxes: [{
	                    display: true,
	                    scaleLabel: {
	                        display: true,
							labelString: th // ---a modifier pour afficher l'echelle de temps adequateeee----
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
			},
			plugins: [{
				beforeDraw: function(c) {
				   var reset_zoom = document.getElementById("reset_zoom"); //reset button
				   var ticks = c.scales['x-axis-0'].ticks.length; //x-axis ticks array
				   var labels = c.data.labels.length; //labels array
				   if (ticks < labels) reset_zoom.hidden = false;
				   else reset_zoom.hidden = true;
				}
			 }]
        })
	this.chart = myChart;
	$('#reset_zoom').click(function(){
		myChart.resetZoom();
	});
}