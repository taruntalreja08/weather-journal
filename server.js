projectData = {};
const express = require('express');

const app = express();

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('website'));

const port = 3000;
const server = app.listen(port, listening);
 function listening(){
    console.log(`running on localhost: ${port}`);
  };

app.get('/all', sendData);

function sendData (request, response) {
  response.send(projectData);
};

app.post('/add', (request,response)=>{
  let data = request.body;
  console.log(data.temp);

  projectData["temp"] = data.temp;
  projectData["feel"] = data.feeling;
  projectData["date"] = data.date;

  response.send(projectData);
})