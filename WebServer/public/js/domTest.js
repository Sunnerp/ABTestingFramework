function updateVarient(variant) {
  var h3 = document.getElementById(variant.pageID)
  h3.innerHTML = variant.variant

}

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