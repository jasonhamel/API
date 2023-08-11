// HINTS:
// 1. Import express and axios

// 2. Create an express app and set the port number.

// 3. Use the public folder for static files.

// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.

import express from "express";
import axios from "axios";

const app = express();
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const request = await axios("https://secrets-api.appbrewery.com/random");
    let secret = request.data.secret;
    let userName = request.data.username;

    res.render("index.ejs", {
      secret: secret,
      user: userName,
    });
  } catch (error) {
    console.log("Server was unreachable: " + error.message);
    res.render("index.ejs", { secret: error.message, user: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
