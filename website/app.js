const apiKey = 'd112548d48e83b00f7fae8b014d0fe13'
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
let apiKeyURL = '&appid=' + apiKey + '&units=imperial';

let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

 function performAction(e) {
    let zip = document.getElementById('zip').value;
    let feeling = document.getElementById('feelings').value;

    getWeather(baseURL, zip, apiKeyURL).then(function(data){
      let temp = data.main.temp;
      postData('/add', {temp:temp, feeling:feeling, date:newDate})
     })
     .then(
      retrieveData()
      );

}

const getWeather = async (baseURL, zip, key)=>{
    const res = await fetch(baseURL+zip+key)
    try {

      const data = await res.json();
      return data;
    }  catch(error) {
      console.log("error", error);
    }
}

const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),  
  });

    try {
      const newData = await response.json();
      return newData
    }catch(error) {
    console.log("error", error);
    }
}

 const retrieveData = async () =>{ 
  const request = await fetch('/all');
  try {
    const allData = await request.json()
    document.getElementById('temp').innerHTML = 'Temperature : ' + Math.round(allData.temp) + ' degrees';
    document.getElementById('content').innerHTML = 'Feeling : ' + allData.feel;
    document.getElementById("date").innerHTML = 'Date : ' + allData.date;
  }
  catch(error) {
    console.log("error", error);
  }
}
