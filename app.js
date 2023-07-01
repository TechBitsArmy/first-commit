const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

app.post("/", (req, res) => {
    const city = req.body.cityName;
    // const city = "vadodara";
    const apiKey = "32fb6233934379a2f08fa564b5a1c6a6";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + unit + "&appid=" + apiKey;
    https.get(url, (response) => {
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const des = weatherData.weather[0].description;
            res.write("<h1>The Temperature in " + city + "is " + temp + " degrees Calcuis</h1>")
            res.write("The weather is currently " + des);
            const img = weatherData.weather[0].icon
            const imgURL = "https://openweathermap.org/img/wn/" + img + "@2x.png"
            res.write("<img src=" + imgURL + ">");
            res.send();
        });

    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000 ");
})