/*!
 * Start Bootstrap - SB Admin 2 v4.0.7 (https://startbootstrap.com/template-overviews/sb-admin-2)
 * Copyright 2013-2020 Start Bootstrap
 * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-sb-admin-2/blob/master/LICENSE)
 */

function drawChart() {
    window.chartColors =
    {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)'
    };

    (function (global) {
        var MONTHS = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];

        var COLORS = [
            '#4dc9f6',
            '#f67019',
            '#f53794',
            '#537bc4',
            '#acc236',
            '#166a8f',
            '#00a950',
            '#58595b',
            '#8549ba'
        ];

        var Samples = global.Samples || (global.Samples = {});
        var Color = global.Color;

        Samples.utils = {
            // Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/


            labels: function (config) {
                var cfg = config || {};
                var min = cfg.min || 0;
                var max = cfg.max || 100;
                var count = cfg.count || 8;
                var step = (max - min) / count;
                var decimals = cfg.decimals || 8;
                var dfactor = Math.pow(10, decimals) || 0;
                var prefix = cfg.prefix || '';
                var values = [];
                var i;

                for (i = min; i < max; i += step) {
                    values.push(prefix + Math.round(dfactor * i) / dfactor);
                }

                return values;
            },

            months: function (config) {
                var cfg = config || {};
                var count = cfg.count || 12;
                var section = cfg.section;
                var values = [];
                var i, value;

                for (i = 0; i < count; ++i) {
                    value = MONTHS[Math.ceil(i) % 12];
                    values.push(value.substring(0, section));
                }

                return values;
            },

            color: function (index) {
                return COLORS[index % COLORS.length];
            },

            transparentize: function (color, opacity) {
                var alpha = opacity === undefined ? 0.5 : 1 - opacity;
                return Color(color).alpha(alpha).rgbString();
            }
        };
    }(this));
    var color = Chart.helpers.color;
    var config = {
        type: "line",
        data: {
            labels: maindata.dates,
            datasets: [{
                label: "Casos Confirmados",
                backgroundColor: color(window.chartColors.purple).alpha(0.5).rgbString(),
                borderColor: window.chartColors.purple,
                borderWidth: 4,
                fill: false,
                data: maindata.confirmed
            }, {
                label: "Casos Suspeitos",
                backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
                borderColor: window.chartColors.blue,
                borderWidth: 1,
                fill: false,
                data: maindata.suspects
            }, {
                label: "Contactos em Vigilância",
                backgroundColor: color(window.chartColors.orange).alpha(0.5).rgbString(),
                borderColor: window.chartColors.orange,
                borderWidth: 1,
                fill: false,
                data: maindata.contacts
            }, {
                label: "Obitos",
                backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
                borderColor: window.chartColors.red,
                borderWidth: 1,
                fill: false,
                data: maindata.deaths
            }, {
                label: "Recuperados",
                backgroundColor: color(window.chartColors.green).alpha(0.5).rgbString(),
                borderColor: window.chartColors.green,
                borderWidth: 1,
                fill: false,
                data: maindata.recovered
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

                    afterBody: function (tooltipItem, data) {
                        return "Taxa de Crescimento: " + growth.toLocaleString();
                    }


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
    }
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myLine = new Chart(ctx, config);
}
