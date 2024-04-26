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
    hours: function(cfg) {
        const hours = [];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
        for (let i = 0; i < 7; i++) {
            const dayHours = [];
            for (let j = 0; j < 24; j++) {
                dayHours.push(`${days[i]} ${j}:00`);
            }
            hours.push(dayHours);
        }
    
        return hours.flat();
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

const initProgress = document.getElementById('initialProgress');
const progress = document.getElementById('animationProgress');

const DATA_COUNT = 168; // Assuming 24 hours of data
const NUMBER_CFG = {count: DATA_COUNT, min: -50, max: 50};
const labels = Utils.hours({count: DATA_COUNT});

const data = {
    labels: labels,
    datasets: [
        {
            label: 'Temperature',
            data: 0,
            borderColor: Utils.CHART_COLORS.red,
            backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
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
                text: "Hourly temperature of Ulaanbaatar"
            }
        },
    },
};

const id = [
    'Asia%2FTokyo',
    'America%2FNew_York',
    'Europe%2FLondon',
    'Asia%2FUlaanbaatar',
];

async function getGraph() {
    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, config);

    const data = await getWeather(id[3]); // Fetch weather data for Ulaanbaatar
    // Assuming you have only one dataset for temperature in your chart
    chart.data.datasets[0].data = data.hourly.temperature_2m;
    chart.update();
}

getGraph();



async function getWeather(city){
    const result = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&timezone=${city}`);
    const data = await result.json();
    weatherData = data.hourly.temperature_2m;
    console.log(weatherData);
    return data;
};
