import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { result: result.activity });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  let type = req.body.type;
  let participants = req.body.participants;

  let baseUrl = "https://bored-api.appbrewery.com/filter";
  if (type != "" || participants != "") {
    baseUrl += "?";
  }

  if (type != "") {
    baseUrl += "type=" + type;
  }
  if (type != "" && participants != "") {
    baseUrl += "&";
  }
  if (participants != "") {
    baseUrl += "participants=" + participants;
  }

  try {
    const response = await axios.get(baseUrl);
    const result = response.data;
    const random = Math.floor(Math.random() * result.length);
    res.render("index.ejs", { result: result[random].activity });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      result: "No activities that match your criteria.",
    });
  }
  // Step 2: Play around with the drop downs and see what gets logged.
  // Use axios to make an API request to the /filter endpoint. Making
  // sure you're passing both the type and participants queries.
  // Render the index.ejs file with a single *random* activity that comes back
  // from the API request.
  // Step 3: If you get a 404 error (resource not found) from the API request.
  // Pass an error to the index.ejs to tell the user:
  // "No activities that match your criteria."
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
