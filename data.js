// import Chart from 'chart.js/auto';

const id = [
    'Asia%2FTokyo',
    'America%2FNew_York',
    'Europe%2FLondon',
    'Asia%2FUlaanbaatar',
];

async function getWeather(city){
    const result = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&timezone=${city}`);
    const data = await result.json();
    console.log(data);
    return data;
}

function getGraph(){
    const data = getWeather(id[3]);
    console.log(data);
    const ctx = document.getElementById("myChart");

    new Chart(ctx, {
      // type: "bar",
      // data: {
      //   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      //   datasets: [
      //     {
      //       label: "# of Votes",
      //       data: [12, 19, 3, 5, 2, 10],
      //       borderWidth: 1,
      //     },
      //   ],
      // },
      // options: {
      //   scales: {
      //     y: {
      //       beginAtZero: true,
      //     },
      //   },
      // },
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
        onComplete: function(context) {
          if (context.initial) {
            console.log('Initial animation finished');
          } else {
            console.log('animation finished');
          }
        }
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      },
      plugins: {
        title: {
          display: true,
          text: 'Chart.js Line Chart - Animation Progress Bar'
        }
      },
    },
    });
}

getGraph();