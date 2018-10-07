//<--Exemple pour le multi-line-->
		var config = {
			type: 'line',
			data: {
				labels: [['June', '2015'], 'July', 'August', 'September', 'October', 'November', 'December', ['January', '2016'], 'February', 'March', 'April', 'May'],
				datasets: [{
					label: 'My First dataset',
					fill: false,
					backgroundColor: window.chartColors.red,
					borderColor: window.chartColors.red,
					data: [
						//<--dataset1-->
					]
				}, {
					label: 'My Second dataset',
					fill: false,
					backgroundColor: window.chartColors.blue,
					borderColor: window.chartColors.blue,
					data: [
						//<--dataset2-->
					],
				}]
			},
			options: {
				responsive: true,
				title: {
					display: true,
					text: 'Chart with Multiline Labels'
				},
			}
		};

		window.onload = function() {
			var ctx = document.getElementById('canvas').getContext('2d');
			window.myLine = new Chart(ctx, config);
		};