$(document).ready(function() {

	/**
	 * INITIALISATION DE L'APPLICATION
	 */
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


function formatData() {
	var cryptoSize = this.crypt.length

	return new Promise((resolve, reject) => {
		var datasets = []

		$.each(this.crypt, (i, r) => {
			var myObj = {}
			//var myObj1 = {}
			console.log('http://localhost:3000/getChart/'+r+'/'+this.tempo)
			$.ajax({
				url : 'http://localhost:3000/getChart/'+r+'/'+this.tempo,
				type : 'GET',
				dataType : 'json',
				success : function(res, statut){ 
					var myData = res
					var value = []
					//var meanGauss=[]
					var time = []
					var volume =[]
					$.each(myData, (index, row) => {
						time.push(row.openTime)
						value.push(row.closeValue)
						volume.push(row.volume)
						//meanGauss.push((parseFloat(row.high)+parseFloat(row.low))/2)

					})
					myObj = {
			            label: r,
			            data: value,
			            backgroundColor:colorTab(value.length),
			            borderColor:colorTab(value.length),
			            borderWidth: 1
					}
					/*myObj1 = {
			            label: "moyenneGauss",
			            data: meanGauss,
			            backgroundColor:colorTab(value.length),
			            borderColor:colorTab(value.length),
			            borderWidth: 1
				    }
*/			

					datasets.push(myObj)
					//datasets.push(myObj1)

					if(datasets.length/*/2*/ === cryptoSize) {
						resolve([time, datasets])						
					} 
				}
			})
		})
	})
}




