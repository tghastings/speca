// On Load
window.onload = function () {
  var ctx = document.getElementById('canvas').getContext('2d');
  window.myLine = new Chart(ctx, config);
  var i = 0;
  do{
    config.data.labels.push(i);
    i = i + 1;
  } while(i < 250)
  window.myLine.update();
};

// WS
var specApp = {};
specApp.connect = function () {
  var ws = new WebSocket('ws://10.5.9.83:3001');
  ws.onopen = function () {
    console.log('ws connected');
    specApp.ws = ws;
  };
  ws.onerror = function () {
    console.log('ws error');
  };
  ws.onclose = function () {
    console.log('ws closed');
  };
  ws.onmessage = function (msgevent) {
    var msg = JSON.parse(msgevent.data);
    console.log('in :', msg);
    // message received, do something
  };
};
//

var config = {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'RTL-SDC',
      data: [],
      fill: false,
    }]
  },
  options: {
    responsive: true,
    animation: false,
    title: {
      display: true,
      text: 'Spectrum'
    },
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Frequency (MHz)'
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'dBW'
        }
      }]
    }
  }
};


function addData(data) {
  if (config.data.datasets.length > 0) {
    config.data.datasets.forEach(function (dataset) {
      dataset.data.push('200');
    });
    window.myLine.update();
  }
}

function removeData() {
  config.data.datasets[0].data = [];
  config.data.labels = []
  window.myLine.update();
}