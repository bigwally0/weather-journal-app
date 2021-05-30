
// Create a new date instance
let d = new Date();
let newDate =   d.getDate() + '/' + Number(d.getMonth()+1) + '/' + d.getFullYear();

// Async GET
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

// Async POST
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });
    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};

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

const updateUI = async () => {
    const req = await fetch('/all');
    try {
        const reqData = await req.json();
        document.getElementById('date').innerHTML = `Report Date: ${reqData[0].date}`;
        document.getElementById('temp').innerHTML = `Temperature is: ${reqData[0].temp}`;
        document.getElementById('content').innerHTML = `My feeling today is: ${reqData[0].content}`;
    }
    catch (error) {
        console.log('error', error);
    }
}