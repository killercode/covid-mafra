function drawPieChart() 
{

  var DATA_COUNT =11;

		var utils = Samples.utils;

		utils.srand(50);

		function colorize(opaque, hover, ctx) {
      var v = ctx.dataIndex;
      
      var c = v < 0 ? '#D60000'
        : v < 1 ? '#44DE28'
        : v < 2 ? '#F46300'
				: v < 3 ? '#0358B6'
        : v < 4 ? '#00D600'
        : v < 5 ? '#4dc9f6'
        : v < 6 ? '#f67019'
        : v < 7 ? '#f53794'
        : v < 8 ? '#537bc4'
        : v < 9 ? '#acc236'
        : v < 10 ? '#166a8f'
        : '#00a950';

			var opacity = hover ? 0.5 - Math.abs((v) / (150)) - 0.3 : 0.5 - Math.abs((v) / (150));

			return opaque ? c : utils.transparentize(c, opacity);
		}

		function hoverColorize(ctx) {
			return colorize(false, true, ctx);
		}


  // Set new default font family and font color to mimic Bootstrap's default styling
  Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
  Chart.defaults.global.defaultFontColor = '#858796';

  sortedData = [
    
  ]

  // Pie Chart Example
  var ctx = document.getElementById("canvas2");
  var myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ["Ericeira", "Encarnação","Mafra",  "Sto Isidoro", "U. F. Malveira e São Miguel de Alcainça", "Carvoeira", "U. F. Azueira e Sobral da Abelheira", "U. F. Igreja Nova e Cheleiros", "U. F. Enxara do Bispo, Gradil e V. F. do Rosário", "Milharado", "U. F. V. do Pinheiro e Santo Estevão das Galés"],
      datasets: [{
        data: [
          localdata.locEriceira[localdata.locEriceira.length - 1],
          localdata.locEnc[localdata.locEnc.length - 1],
          localdata.locMafra[localdata.locMafra.length - 1],
          localdata.locSantoIsidoro[localdata.locSantoIsidoro.length - 1],
          localdata.locMalveira[localdata.locMalveira.length - 1],
          localdata.locCarvoeira[localdata.locCarvoeira.length - 1],
          localdata.locAzueira[localdata.locAzueira.length - 1],
          
          localdata.locCheleiros[localdata.locCheleiros.length - 1],
          localdata.locGradil[localdata.locGradil.length - 1],
          
          localdata.locMilharado[localdata.locMilharado.length - 1],
          localdata.locVenda[localdata.locVenda.length - 1]],
          backgroundColor: colorize.bind(null, false, false),
					hoverBackgroundColor: hoverColorize
      }],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: true,
        caretPadding: 10,
      },
      legend: {
        display: false
      },
      plugins: {
        labels: {
          render: 'label',
          fontColor: '#000',
          position: 'outside',
          outsidePadding: 8,
          textMargin: 8
        }
      },
      cutoutPercentage:30,
    },
  });
}

