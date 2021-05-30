// Setup empty JS object to act as endpoint for all routes
projectData = {};
/* Global Variables */
//Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 2021;
const zipData = [];

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
// Callback to debug
const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// GET Route
app.get('/all', sendData);

// Callback function to complete GET '/all'
function sendData (req,res){
    res.send(zipData).status(200).end();
};

// Post zip data
app.post('/addZipData', addZip);

// Initialize all route with a callback function
function addZip (req, res) {
	zipData.pop();
	projectData = {
		temp: req.body.temp,
        date: req.body.date,
        content: req.body.content
	}
  	zipData.push(projectData);
  	res.send(zipData).status(200).end();
  	console.log(zipData);
};