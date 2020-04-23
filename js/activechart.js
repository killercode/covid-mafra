function drawActiveChart() {

    var color = Chart.helpers.color;
    var config = {
        type: 'line',
        data: {
            labels: maindata.dates,
            datasets: [{
                label: 'Casos Activos',
                backgroundColor: color(window.chartColors.purple).alpha(0.5).rgbString(),
                borderColor: window.chartColors.purple,
                borderWidth: 4,
                fill: false,
                data: maindata.active,
            }]
        },
        options:
        {
            responsive: true,

            tooltips: {
                mode: 'index',
                callbacks: {
                    label: function (tooltipItem, data) {
                        if (tooltipItem.index > 0) {
                            growth = (data.datasets[0].data[tooltipItem.index] - data.datasets[0].data[tooltipItem.index - 1]) / data.datasets[0].data[tooltipItem.index - 1];
                        }
                        else {
                            growth = "";
                        }
                        return data.datasets[tooltipItem.datasetIndex].label + ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].toLocaleString();

                    },
                }
            },
            maintainAspectRatio: false,

            title: {
                text: 'Chart.js Time Scale'
            },
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        parser: timeFormat,
                        unit: "day",
                        // round: 'day'
                        tooltipFormat: 'DD/MM/YYYY'
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Date'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'value'
                    }
                }]
            },
        }
    };

    var ctx = document.getElementById('canvas3').getContext('2d');
    window.myLine = new Chart(ctx, config);
}