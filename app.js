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
			console.log('http://localhost:3000/getChart/'+r+'/'+this.tempo)
			$.ajax({
				url : 'http://localhost:3000/getChart/'+r+'/'+this.tempo,
				type : 'GET',
				dataType : 'json',
				success : function(res, statut){ 
					var myData = res
					var value = []
					var time = []

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




