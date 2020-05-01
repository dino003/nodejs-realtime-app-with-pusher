const baseUrl = 'http://localhost:4000';
const form = document.getElementById('vote-form');

form.addEventListener('submit', (event) => {
    const choice = document.querySelector('input[name=os]:checked').value;
    const data = {
        os: choice
    }

    fetch(baseUrl + '/votes',  {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(res => res.json())
    .then(data => console.log({data}))
    .catch(err => console.log({err}))

    event.preventDefault();
})

let dataPoints = [
    {label: 'Windows', y: 0},
    {label: 'Mac', y: 0},
    {label: 'Linux', y: 0},
    {label: 'Autres', y: 0},

];

const chartContainer = document.querySelector('#chartContainer');

if(chartContainer) {
    const chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        theme: 'theme1',
        title: {
            text: 'OS Results'
        },
        data: [
            {
                Type: 'bar',
                dataPoints: dataPoints
            }
        ]
    });

    chart.render();

     // Enable pusher logging - don't include this in production
     Pusher.logToConsole = true;

     const pusher = new Pusher('75b4c72486252e9f6648', {
       cluster: 'eu'
     });
 
     const channel = pusher.subscribe('os-poll-channel');
     channel.bind('os-vote-event', function(data) {
         dataPoints = dataPoints.map(x => {
             if(x.label == data.os) {
                 x.y += data.points;
                 return x;
             }else return x;
         })
         chart.render();
     });
}