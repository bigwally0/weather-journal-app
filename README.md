# Weather-Journal App Project

## Table of Contents
- [Installation](#Installation)
- [Implementation](#Implementation)

## Installation
### 

###I followed these steps for setting up Client Server Environment:
* Installing Node and Express, cors, body-parser packages.
* Using chaining promises by `POST` and `GET` routes in both **Client** and **Server** sides.
* Acquiring API credentials from _OpenWeatherMap_ website.
* Creating `async` function to `fetch` weather data and pass it to the server. 
* Set up update user interface function dynamically.

## Implementation

### Server Side  
* Setting Up a port for my server and a listener for it:
```
const port = 2021;
const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
```

* Setting Up **GET** and POST routes:

```
app.get('/all', sendData);

function sendData (req,res){
    res.send(zipData).status(200).end();
};
```

```
app.post('/add', (req, res) => {
    projectData.date = req.body.date;
```

### Client Side
* Acquiring API credentials from _OpenWeatherMap_ website.
* Inside `.then()` waiting for promise **async** function to make a **POST** request to update UI with the returned data:
```
document.getElementById('generate').addEventListener('click', () => {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getZipData(zip)
    .then((data) => {
        postData('/addZipData', {
            temp: data.main.temp,
            date: newDate,
            content: feelings
        })
        .then(() => {
            updateUI();
        });
    });
});
```
```
const getZipData = async (code) => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${code},us&units=imperial&appid=f82c8af38c8afcaa01b3999226a3aa5e`);
    try {
    // Transform into JSON
        const data = await res.json();
        return data;
    }
    catch(error) {
        console.log('error', error);
        // appropriately handle the error
    }
}
```