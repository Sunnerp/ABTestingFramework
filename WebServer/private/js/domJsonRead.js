
function CreatePersonDetail(name, age, residence, alertMessage){

    let personDiv = document.createElement('div')
    personDiv.style.backgroundColor = '#121212'
    personDiv.style.border = '5px solid red'
    personDiv.style.marginBottom = '10px'
    let nameP = document.createElement('h2')
    nameP.style.cursor = 'pointer'
    nameP.onclick = function(event) {
       alert(alertMessage)
        
    }
    nameP.innerHTML = name
    let ageP = document.createElement('p')
    ageP.style.fontSize = '72px'
    ageP.innerHTML = age

    let residenceP = document.createElement('strong')
    residenceP.innerHTML = residence
    personDiv.appendChild(nameP)
    personDiv.appendChild(ageP)
    personDiv.appendChild(residenceP)
    return personDiv
}

window.onload = function(){

    let request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            var apiReturn = document.getElementById("ApiReturn")


            var jsonResponse = JSON.parse(request.response)
            var peoples = jsonResponse.people
            for(var peep of peoples){
                var person = CreatePersonDetail(peep.name, peep.age, peep.residence, peep.alert)
                apiReturn.appendChild(person)

            }

        }
    }
    request.open('GET', '/ChodeAPI')
    request.setRequestHeader('Content-type', 'application/json')
    request.send()
}
