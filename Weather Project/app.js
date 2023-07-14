import express from "express";
import https from "https";
import { fileURLToPath } from "url";
import { dirname } from "path";
import "dotenv/config";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  let query = req.body.cityName;
  let units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    process.env.API_KEY +
    "&units=" +
    units;
  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write(
        "<p>The current conditions in " +
          query +
          " are " +
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
  console.log("Server is now running on port 3000.");
});
