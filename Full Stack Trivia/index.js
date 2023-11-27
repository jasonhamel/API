import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const app = express();
const url = "http://localhost:4000/new-scoreboard";

let chosenQuestion;
let player1Score = 0;
let player2Score = 0;
let playerTurn = 1;

let board = await axios.get(url);
board = board.data;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.render("index.ejs", { player1: player1Score, player2: player2Score });
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
