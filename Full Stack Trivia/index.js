import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();

let board = [];
let score;
let chosenQuestion;
let player1Score = 0;
let player2Score = 0;
let playerTurn = 1;

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
            score = 100;
            break;
          case 1:
            categories = "categories=history";
            difficulties = "difficulties=medium";
            limit = "limit=1";
            score = 200;
            break;
          case 2:
            categories = "categories=history";
            difficulties = "difficulties=hard";
            limit = "limit=1";
            score = 300;
            break;
          case 3:
            categories = "categories=music";
            difficulties = "difficulties=easy";
            limit = "limit=1";
            score = 100;
            break;
          case 4:
            categories = "categories=music";
            difficulties = "difficulties=medium";
            limit = "limit=1";
            score = 200;
            break;
          case 5:
            categories = "categories=music";
            difficulties = "difficulties=hard";
            limit = "limit=1";
            score = 300;
            break;
          case 6:
            categories = "categories=science";
            difficulties = "difficulties=easy";
            limit = "limit=1";
            score = 100;
            break;
          case 7:
            categories = "categories=science";
            difficulties = "difficulties=medium";
            limit = "limit=1";
            score = 200;
            break;
          case 8:
            categories = "categories=science";
            difficulties = "difficulties=hard";
            limit = "limit=1";
            score = 300;
            break;
          case 9:
            categories = "categories=geography";
            difficulties = "difficulties=easy";
            limit = "limit=1";
            score = 100;
            break;
          case 10:
            categories = "categories=geography";
            difficulties = "difficulties=medium";
            limit = "limit=1";
            score = 200;
            break;
          case 11:
            categories = "categories=geography";
            difficulties = "difficulties=hard";
            limit = "limit=1";
            score = 300;
            break;
          case 12:
            categories = "categories=film_and_tv";
            difficulties = "difficulties=easy";
            limit = "limit=1";
            score = 100;
            break;
          case 13:
            categories = "categories=film_and_tv";
            difficulties = "difficulties=medium";
            limit = "limit=1";
            score = 200;
            break;
          case 14:
            categories = "categories=film_and_tv";
            difficulties = "difficulties=hard";
            limit = "limit=1";
            score = 300;
            break;
        }
        let request = await axios.get(
          baseURL + categories + "&" + difficulties + "&" + limit
        );
        let response = request.data;
        board.push({
          question: response[0].question.text,
          answer: response[0].correctAnswer,
          score: score,
        });
      }

      console.log(board);
      res.render("index.ejs", { player1: player1Score, player2: player2Score });
    } catch (error) {
      console.log("Failed to connect to server: " + error.message);
    }
  } else {
    res.render("index.ejs", {
      player1: player1Score,
      player2: player2Score,
    });
  }
});

app.get("/question", (req, res) => {
  console.log(req.body);
  res.render("index.ejs", {
    player1: player1Score,
    player2: player2Score,
  });
});

app.post("/question", (req, res) => {
  chosenQuestion = req.body.question;
  if (board[chosenQuestion] == null) {
    res.redirect("/");
  }
  res.render("question.ejs", {
    question: board[chosenQuestion].question,
  });
});

app.get("/check", (req, res) => {
  let userAnswer = req.query.userAnswer;
  let answer = board[chosenQuestion].answer;
  console.log(userAnswer.toUpperCase());
  console.log(answer.toUpperCase());
  console.log(userAnswer.toUpperCase() === answer.toUpperCase());
  if (userAnswer.toUpperCase() === answer.toUpperCase()) {
    if (playerTurn == 1) {
      player1Score += board[chosenQuestion].score;
    } else {
      player2Score += board[chosenQuestion].score;
    }
  } else {
    if (playerTurn == 1) {
      playerTurn = 2;
    } else {
      playerTurn = 1;
    }
  }
  board[chosenQuestion] = null;
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
