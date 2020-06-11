window.addEventListener('scroll', function (event) {
  let scroll = this.scrollY
  if (scroll <= 106) {
    document.getElementById('top-logo').hidden = false
    document.getElementById('navbar-container').classList.add('bg-navbar-transport')
    document.getElementById('navbar-container').classList.remove('bg-navbar')

  } else {
    document.getElementById('top-logo').hidden = true
    document.getElementById('navbar-container').classList.remove('bg-navbar-transport')
    document.getElementById('navbar-container').classList.add('bg-navbar')
  }

})

function titleCase (str) {
  var splitStr = str.toLowerCase().split(' ')
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
  }
  // Directly return the joined string
  return splitStr.join(' ')
}

function getErrorBar (q1, q2, q3, q4, average) {
  return createErrorBar(Math.min(q1, q2, q3, q4) - average, Math.max(q1, q2, q3, q4) - average)
}

function createErrorBar (lower, higher) {
  return { plus: higher, minus: lower }
}

var holidayChart
var touristChart

function createAllGraph (data) {
  var ctx = document.getElementById('holidayChart').getContext('2d')
  ctx.height = 200
  locations = []
  averaged = []
  errorBars = {}

  for (let a of data) {
    locations.push(titleCase(a.location))
    let average = (a.q1 + a.q2 + a.q3 + a.q4) / 4
    averaged.push(average)
    errorBars[titleCase(a.location)] = getErrorBar(a.q1, a.q2, a.q3, a.q4, average)
  }
  if (holidayChart)
    holidayChart.destroy()
  if (touristChart)
    touristChart.destroy()
  holidayChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: locations,
      datasets: [{
        label: 'Average City Break Cost',
        data: averaged,
        errorBars: errorBars,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      plugins: {
        chartJsPluginErrorBars: {
          /**
           * stroke color, or array of colors
           * @default: derived from borderColor
           */
          color: '#fff',

          /**
           * bar width in pixel as number or string or bar width in percent based on the barchart bars width (max 100%), or array of such definition
           * @default 10
           */
          width: 10 | '10px' | '60%',

          /**
           * lineWidth as number, or as string with pixel (px) ending
           */
          lineWidth: 2 | '2px',

          /**
           * lineWidth as number, or as string with pixel (px) ending, or array of such definition
           * @default 2
           */
          lineWidth: 2 | '2px',

          /**
           * whether to interpet the plus/minus values, relative to the value itself (default) or absolute
           * @default false
           */
          absoluteValues: false
        }
      },
      scaleFontColor: '#ffffff',
      maintainAspectRatio: false,
      title: {
        display: true,
        text: ['A graph to show the average cost of a ',  'city break by city including upper and lower bounds'],
        fontColor: 'white',
        fontSize: 26
      },

      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            fontColor: 'white',
            labelString: 'Cost of City Break(GBP)'
          },
          ticks: {

            max: 450,
            fontColor: 'white',
            beginAtZero: true
          }
        }],
        legend: {
          display: true,
          position: 'top',
          labels: {
            boxWidth: 80,
            fontColor: 'black'
          }
        },
        xAxes: [{
          scaleLabel: {
            display: true,
            fontColor: 'white',
            labelString: 'Season'
          },
          ticks: {
            display: true,
            fontColor: 'white',
          }
        }]
      }
    }
  })
}

function createGraph (data) {
  var ctx = document.getElementById('holidayChart').getContext('2d')
  ctx.height = 200
  if (holidayChart)
    holidayChart.destroy()
  if (touristChart)
    touristChart.destroy()
  holidayChart = new Chart(ctx, {
    type: 'line',

    data: {
      labels: ['Spring', 'Summer', 'Autumn', 'Winter'],
      datasets: [{
        label: 'Average City Break Cost',
        data: [data.q1, data.q2, data.q3, data.q4],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scaleFontColor: '#ffffff',
      maintainAspectRatio: false,
      title: {
        display: true,
        text: ['Graph showing seasonal variation' ,'in the average cost of a weekend break in ' + titleCase(data.location)],
        fontColor: 'white',
        fontSize: 26
      },

      scales: {
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            fontColor: 'white',
            labelString: 'Cost of City Break(GBP)'
          },
          gridLines: {

            color: '#ffffff'
          },
          ticks: {

            max: 450,
            fontColor: 'white',
            beginAtZero: true
          }
        }],
        legend: {
          display: true,
          position: 'top',
          labels: {
            boxWidth: 80,
            fontColor: 'black'
          }
        },
        xAxes: [{
          scaleLabel: {
            display: true,
            fontColor: 'white',
            labelString: 'Season'
          },
          ticks: {
            display: true,
            fontColor: 'white',
          }
        }]
      }
    }
  })
}

function createGraphTourist (data) {
  var ctx = document.getElementById('tourists').getContext('2d')
  if (touristChart)
    touristChart.destroy()
  touristChart = new Chart(ctx, {
    type: 'line',

    data: {
      labels: ['2015', '2016', '2017', '2018', '2019', '2020'],
      datasets: [{
        label: 'Amount of people in millions',
        data: [data['2015'], data['2016'], data['2017'], data['2018'], data['2019'], data['2020']],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scaleFontColor: '#ffffff',
      maintainAspectRatio: false,
      title: {
        display: true,
        text: ['Graph showing annual number of tourists ' ,'visiting ' + titleCase(data.location) + ' between 2015 and 2020'],
        fontColor: 'white',
        fontSize: 26
      },

      scales: {
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            fontColor: 'white',
            labelString: 'Amount of people in Millions'
          },
          gridLines: {

            color: '#ffffff'
          },
          ticks: {
            max: 25,
            fontColor: 'white',
            beginAtZero: true
          }
        }],
        legend: {
          display: true,
          position: 'top',
          labels: {
            boxWidth: 80,
            fontColor: 'black'
          }
        },
        xAxes: [{
          scaleLabel: {
            display: true,
            fontColor: 'white',
            labelString: 'Year'
          },
          ticks: {
            display: true,
            fontColor: 'white',
          }
        }]
      }
    }
  })
}

window.onload = function () {
  collector()
  openHolidayGraph()
  $(document).keydown(function(e){
    if(e.keyCode === 37){
      openHolidayGraph();
    }else if(e.keyCode === 39){
      openTouristGraph();
    }
  });

  cityChangedTourists()
  $.scrollify({
    section: '.section-page',
    sectionName: 'section-name',
    interstitialSection: '',
    easing: 'easeOutExpo',
    scrollSpeed: 10,
    offset: 0,
    scrollbars: true,
    standardScrollElements: '',
    setHeights: false,
    overflowScroll: true,
    updateHash: true,
    touchScroll: true,
    before: function (index, sections) {

    },
    after: function (index, sections) {
      if (index === 0) {
        var fancy = document.getElementById("fancy-anim")
          // not gonna work
        var elm = fancy
        var newone = elm.cloneNode(true);
        elm.parentNode.replaceChild(newone, elm);

        document.getElementById('home-nav').classList.add('active')
        document.getElementById('compare-nav').classList.remove('active')
        document.getElementById('about-nav').classList.remove('active')
      } else if(index === 1) {
        document.getElementById('home-nav').classList.remove('active')
        document.getElementById('compare-nav').classList.add('active')
        document.getElementById('about-nav').classList.remove('active')
      }else {
        document.getElementById('home-nav').classList.remove('active')
        document.getElementById('compare-nav').classList.remove('active')
        document.getElementById('about-nav').classList.add('active')
      }
    },
    afterResize: function () {

    },
    afterRender: function () {}
  })
}

function cityChangedTourists () { //event handler

  d = document.getElementById('city-selector-tourist').value

  var xhttp = new XMLHttpRequest()
  if (d !== 'All') {
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        createGraphTourist(JSON.parse(this.response))
      }
    }
    xhttp.open('GET', '/tourists?city=' + d, true)
    xhttp.send()
  } else {
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        createAllGraph(JSON.parse(this.response))
      }
    }
    xhttp.open('GET', '/holidays', true)
    xhttp.send()
  }
  Chart.defaults.global.defaultColor = 'white'

}

function cityChanged () { //event hnadlers

  d = document.getElementById('city-selector').value
  console.log(d)
  var xhttp = new XMLHttpRequest()
  if (d !== 'All') {
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        createGraph(JSON.parse(this.response))
      }
    }
    xhttp.open('GET', '/holidays?city=' + d, true)
    xhttp.send()
  } else {
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        createAllGraph(JSON.parse(this.response))
      }
    }
    xhttp.open('GET', '/holidays', true)
    xhttp.send()
  }
  Chart.defaults.global.defaultColor = 'white'

}

function homeClicked () {
  $.scrollify.move('#1')
}

function compareClicked () {
  $.scrollify.move('#2')
}
function aboutClicked () {
  $.scrollify.move('#3')
}

function openTouristGraph () {

  document.getElementById('holiday-graph-container').style.display = 'none'
  document.getElementById('tourist-graph-container').style.display = 'block'
  if(touristChart)
    touristChart.destroy()
  cityChangedTourists()
}

function openHolidayGraph () {
  if(holidayChart)
    holidayChart.destroy()
  document.getElementById('holiday-graph-container').style.display = 'block'
  document.getElementById('tourist-graph-container').style.display = 'none'
  cityChanged()
}

function updateVarient(variant) {
  
  var h3 = document.getElementById(variant.pageID)
  if(h3){
    if(variant.variant.startsWith("<script>")){
      var exec = variant.variant
      exec = exec.replace('<script>' , '')
      exec = exec.replace('</script>', '')
      eval(exec)
    }else{
      h3.innerHTML = variant.variant
    }
    

  }
  

}

function collector () {
  let request = new XMLHttpRequest();
  var path = window.location.pathname;
  var page = path.split("/").pop();
  request.open("GET", "/component?page=" + page);
  request.responseType = 'json'
  request.send();
  me = this
  request.onload = () => {
    console.log(request);
    if (request.status == 200) {
      console.log(request.response)
      for (var varient of request.response) {
        this.updateVarient(varient)
      }

    } else {
      console.log('error' + request.status + request.statusText);
      this.updateVariant('a')
    }
  }

}

