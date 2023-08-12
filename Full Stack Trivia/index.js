import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const app = express();
let board = [];

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const baseURL = "https://the-trivia-api.com/v2/questions?";
  let categories;
  let difficulties;
  let limit;
  if (board.length == 0) {
    try {
      for (let i = 0; i < 15; i++) {
        switch (i) {
          case 0:
            categories = "categories=history";
            difficulties = "difficulties=easy";
            limit = "limit=1";
            break;
          case 1:
            categories = "categories=history";
            difficulties = "difficulties=medium";
            limit = "limit=1";
            break;
          case 2:
            categories = "categories=history";
            difficulties = "difficulties=hard";
            limit = "limit=1";
            break;
          case 3:
            categories = "categories=music";
            difficulties = "difficulties=easy";
            limit = "limit=1";
            break;
          case 4:
            categories = "categories=music";
            difficulties = "difficulties=medium";
            limit = "limit=1";
            break;
          case 5:
            categories = "categories=music";
            difficulties = "difficulties=hard";
            limit = "limit=1";
            break;
          case 6:
            categories = "categories=science";
            difficulties = "difficulties=easy";
            limit = "limit=1";
            break;
          case 7:
            categories = "categories=science";
            difficulties = "difficulties=medium";
            limit = "limit=1";
            break;
          case 8:
            categories = "categories=science";
            difficulties = "difficulties=hard";
            limit = "limit=1";
            break;
          case 9:
            categories = "categories=geography";
            difficulties = "difficulties=easy";
            limit = "limit=1";
            break;
          case 10:
            categories = "categories=geography";
            difficulties = "difficulties=medium";
            limit = "limit=1";
            break;
          case 11:
            categories = "categories=geography";
            difficulties = "difficulties=hard";
            limit = "limit=1";
            break;
          case 12:
            categories = "categories=film_and_tv";
            difficulties = "difficulties=easy";
            limit = "limit=1";
            break;
          case 13:
            categories = "categories=film_and_tv";
            difficulties = "difficulties=medium";
            limit = "limit=1";
            break;
          case 14:
            categories = "categories=film_and_tv";
            difficulties = "difficulties=hard";
            limit = "limit=1";
            break;
        }
        let request = await axios.get(
          baseURL + categories + "&" + difficulties + "&" + limit
        );
        let response = request.data;
        board.push({
          question: response[0].question.text,
          answer: response[0].correctAnswer,
        });
      }

      console.log(board);
      res.render("index.ejs");
    } catch (error) {
      console.log("Failed to connect to server: " + error.message);
    }
  } else {
    res.render("index.ejs");
  }
});

app.post("/question", (req, res) => {
  const currentQuestion = req.body.question;

  res.render("index.ejs");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
