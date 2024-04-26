const Utils = {
    // 'red', 'blue', 'green', 'yellow', 'purple', 'orange', 'grey'
    CHART_COLORS: {
        red: 'rgb(255, 99, 132)',
        blue: 'rgb(54, 162, 235)',
        green: 'green',
        yellow: 'yellow',
        purple: 'purple',
        orange: 'orange',
        grey: 'grey'
    },
    numbers: function(cfg) {
        let arr = [];
        for (let i = 0; i < cfg.count; i++) {
            arr.push(Math.floor(Math.random() * (cfg.max - cfg.min + 1)) + cfg.min);
        }
        return arr;
    },
    rand: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    days: function(cfg) {
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        return days.slice(0, cfg.count);
    },
    namedColor: function(index) {
        const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'grey'];
        return this.CHART_COLORS[colors[index % colors.length]];
    },
    transparentize: function(color, opacity) {
        const alpha = opacity === undefined ? 0.5 : 1 - opacity;
        return color.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
    }
};

const actions = [
    {
      name: 'Add Dataset',
      handler(chart) {
        const data = chart.data;
        const dsColor = Utils.namedColor(chart.data.datasets.length);
        const newDataset = {
          label: 'Dataset ' + (data.datasets.length + 1),
          backgroundColor: Utils.transparentize(dsColor, 0.5),
          borderColor: dsColor,
          data: Utils.numbers({count: data.labels.length, min: -50, max: 50}),
        };
        chart.data.datasets.push(newDataset);
        chart.update();
      }
    },
    {
      name: 'Add Data',
      handler(chart) {
        const data = chart.data;
        if (data.datasets.length > 0) {
          data.labels = Utils.days({count: data.labels.length + 1});
  
          for (let index = 0; index < data.datasets.length; ++index) {
            data.datasets[index].data.push(Utils.rand(-50, 50));
            // data nemeh heseg  "Utils.rand(-50, 50)" orond
          }
  
          chart.update();
        }
      }
    },
    {
      name: 'Remove Dataset',
      handler(chart) {
        chart.data.datasets.pop();
        chart.update();
      }
    },
    {
      name: 'Remove Data',
      handler(chart) {
        chart.data.labels.splice(-1, 1);
  
        chart.data.datasets.forEach(dataset => {
          dataset.data.pop();
        });
  
        chart.update();
      }
    }
  ];
  
  const initProgress = document.getElementById('initialProgress');
  const progress = document.getElementById('animationProgress');
  
  const DATA_COUNT = 7;
  const NUMBER_CFG = {count: DATA_COUNT, min: -50, max: 50};
  
  const labels = Utils.days({count: 7});
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Temperature',
        data: Utils.numbers(NUMBER_CFG),
        borderColor: Utils.CHART_COLORS.red,
        backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
      },
      {
        label: 'Wind speed',
        data: Utils.numbers(NUMBER_CFG),
        borderColor: Utils.CHART_COLORS.blue,
        backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
      }
    ]
  };

  const config = {
    type: 'line',
    data: data,
    options: {
      animation: {
        duration: 2000,
        onProgress: function(context) {
          if (context.initial) {
            initProgress.value = context.currentStep / context.numSteps;
          } else {
            progress.value = context.currentStep / context.numSteps;
          }
        },
        // onComplete: function(context) {
        //   if (context.initial) {
        //     console.log('Initial animation finished');
        //   } else {
        //     console.log('animation finished');
        //   }
        // }
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      },
      plugins: {
        title: {
          display: true,
          text: "Daily temperture of City's"
        }
      },
    },
  };
const ctx = document.getElementById('myChart').getContext('2d');
const chart = new Chart(ctx, config);

// function randomizeData() {
//     actions[0].handler(chart);
// }

function addDataset() {
    actions[0].handler(chart);
}

function addData() {
    actions[1].handler(chart);
}

function removeDataset() {
    actions[2].handler(chart);
}

function removeData() {
    actions[3].handler(chart);
}
