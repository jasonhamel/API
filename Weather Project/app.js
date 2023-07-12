import express from "express";
import https from "https";
const app = express();
import "dotenv/config";

app.get("/", function (req, res) {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=london,ca&appid=" +
    process.env.API_KEY +
    "&units=metric";
  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write(
        "<p>The current conditions are " +
          weatherData.weather[0].description +
          "</p>"
      );
      res.write(
        "<h1>With a temperature of " +
          weatherData.main.temp +
          " degrees celcius</h1>"
      );
      res.write("<img src='" + imageURL + "' />");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});
