import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import "dotenv/config";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// HINTs: Use the axios documentation as well as the video lesson to help you.
// https://axios-http.com/docs/post_example
// Use the Secrets API documentation to figure out what each route expects and how to work with it.
// https://secrets-api.appbrewery.com/

//TODO 1: Add your own bearer token from the previous lesson.
/*
const yourBearerToken = "";

I went out of scope on this assignment and used dotenv to obscure the token and not upload it.
*/

const config = {
  headers: { Authorization: `Bearer ${process.env.YOUR_BEARER_TOKEN}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
  // TODO 2: Use axios to POST the data from req.body to the secrets api servers.
  try {
    const request = await axios.post(
      API_URL + "/secrets",
      {
        secret: req.body.secret,
        score: req.body.score,
      },
      config
    );
    const response = JSON.stringify(request.data);
    res.render("index.ejs", { content: response });
  } catch (error) {
    console.log("Failed to make request: ", error.message);
    res.render("index.ejs", { content: error.message });
  }
});

app.post("/put-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 3: Use axios to PUT the data from req.body to the secrets api servers.
  /*
  NOTE THAT THE API IS CURRENTLY BUSTED AND WILL RETURN A 404 WITH THESE REQUEST TYPES
  CONFIRMED WITH POSTMAN AND IN THE Q&A OF THE COURSE
  */
  const body = {
    secret: req.body.secret,
    score: req.body.score,
  };
  try {
    const request = await axios.put(
      API_URL + "/secrets/" + searchId,
      body,
      config
    );
    const response = JSON.stringify(request.data);
    res.render("index.ejs", { content: response });
  } catch (error) {
    console.log("Failed to make request: ", error.message);
    res.render("index.ejs", { content: error.message });
  }
});

app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 4: Use axios to PATCH the data from req.body to the secrets api servers.
  /*
  NOTE THAT THE API IS CURRENTLY BUSTED AND WILL RETURN A 404 WITH THESE REQUEST TYPES
  CONFIRMED WITH POSTMAN AND IN THE Q&A OF THE COURSE
  */
  try {
    const request = await axios.patch(
      API_URL + "/secrets/" + searchId,
      req.body,
      config
    );
    const response = JSON.stringify(request.data);
    res.render("index.ejs", { content: response });
  } catch (error) {
    console.log("Failed to make the request: ", error.message);
    res.render("index.ejs", { content: error.message });
  }
});

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 5: Use axios to DELETE the item with searchId from the secrets api servers.
  /*
  NOTE THAT THE API IS CURRENTLY BUSTED AND WILL RETURN A 404 WITH THESE REQUEST TYPES
  CONFIRMED WITH POSTMAN AND IN THE Q&A OF THE COURSE
  */
  try {
    const request = await axios.delete(
      API_URL + "/secrets/" + searchId,
      config
    );
    const response = JSON.stringify(request.data);
    res.render("index.ejs", { content: response });
  } catch (error) {
    console.log("Failed to make the request: ", error.message);
    res.render("index.ejs", { content: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
