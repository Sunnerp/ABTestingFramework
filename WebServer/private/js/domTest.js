function updateVarient(variant) {
  var h3 = document.getElementById(variant.pageID)
  h3.innerHTML = variant.variant

}

// function getIP() {
//   let request = new XMLHttpRequest();

//   request.open("GET", "https://api.ipify.org?format=json&callback=getIP")
//   request.responseType = 'json'
//   request.send();
//   request.onload = () => {
//     if (request.status == 200) {
//       this.sendIP(request.response.ip) 
//     } else {
//       console.log('error' + request.status + request.status);
//       //need to set a new else
//     }

//     var p = document.getElementById('ip')
//     p.innerHTML = ip
//   }

// }

// function sendIP(ip) {
//   let request = new XMLHttpRequest();
//   request.open('GET','/splitter?page=' + ip)
//   request.responseType = 'json'
//   request.send();
// }

window.onload = function () {
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