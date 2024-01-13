import axios from "axios";
import * as readline from "readline/promises";

const url = "http://localhost:4000/new-scoreboard";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const board = new Map();
let player1Score = 0;
let player2Score = 0;
let playerTurn = 1;
let loopcount = 0;

await startApp();

while (true) {
  console.log("It's player" + playerTurn + "'s turn");
  await showState();
  await showBoard();
  await chooseAQuestion();
  loopcount++;
  if (loopcount > 14) {
    break;
  }
}

console.log("Game Over");

async function startApp() {
  let results = await axios.get(url);
  setBoard(results.data);

  const rulesAnswer = await rl.question(
    "Welcome to Not Jeopardy! The trivia game that looks vaguely familiar, but with slightly different rules.\nDo you want to see the rules before continuing? Please enter y or yes to see the rules\n"
  );
  if (rulesAnswer == "y" || rulesAnswer == "yes") {
    console.log(
      "\nThis is a two player game. Player 1 will choose a question from the list.\n" +
        "For as long as Player 1 continues to get the correct answers, it will remain their turn.\n" +
        "Once they give a wrong answer, it will switch to Player 2.\n" +
        "Player 2 will take their turn until they give a wrong answer. The its Player 1's turn again.\n" +
        "This continues until there are no more questions to answer. Player with the highest score wins."
    );
    await rl.question("\nPress enter to continue");
  }
  rl.pause();
}

async function showState() {
  console.log("\n\n\tPlayer 1 score: " + player1Score);
  console.log("\n\n\tPlayer 2 score: " + player2Score + "\n\n");
}

async function showBoard() {
  console.log(
    "| **HISTORY** | **MUSIC** | **SCIENCE** | **GEOGRAPHY** | **FILM AND TV** |"
  );
  console.log(
    "|     " +
      board.get("HISTORY").get("100").score +
      "     |    " +
      board.get("MUSIC").get("100").score +
      "    |     " +
      board.get("SCIENCE").get("100").score +
      "     |      " +
      board.get("GEOGRAPHY").get("100").score +
      "      |       " +
      board.get("FILM AND TV").get("100").score +
      "       |"
  );
  console.log(
    "|     " +
      board.get("HISTORY").get("200").score +
      "     |    " +
      board.get("MUSIC").get("200").score +
      "    |     " +
      board.get("SCIENCE").get("200").score +
      "     |      " +
      board.get("GEOGRAPHY").get("200").score +
      "      |       " +
      board.get("FILM AND TV").get("200").score +
      "       |"
  );
  console.log(
    "|     " +
      board.get("HISTORY").get("300").score +
      "     |    " +
      board.get("MUSIC").get("300").score +
      "    |     " +
      board.get("SCIENCE").get("300").score +
      "     |      " +
      board.get("GEOGRAPHY").get("300").score +
      "      |       " +
      board.get("FILM AND TV").get("300").score +
      "       |"
  );
}

async function setBoard(results) {
  const history = new Map();
  const music = new Map();
  const science = new Map();
  const geography = new Map();
  const filmAndTV = new Map();

  for (let i = 1; i < 4; i++) {
    history.set(i + "00", results[i - 1]);
    music.set(i + "00", results[i + 2]);
    science.set(i + "00", results[i + 5]);
    geography.set(i + "00", results[i + 8]);
    filmAndTV.set(i + "00", results[i + 11]);
  }
  board.set("HISTORY", history);
  board.set("MUSIC", music);
  board.set("SCIENCE", science);
  board.set("GEOGRAPHY", geography);
  board.set("FILM AND TV", filmAndTV);
}

async function chooseAQuestion() {
  let chosenQuestion;
  rl.resume();
  let chosenCategory = await rl.question(
    "Please choose a category by typing in its name:\n\t"
  );
  chosenCategory = chosenCategory.toUpperCase();
  chosenQuestion = await rl.question(
    "Please choose either 100, 200, or 300:\n\t"
  );
  rl.pause();
  const checkQuestion = await questionValid(chosenCategory, chosenQuestion);

  if (await askQuestion(checkQuestion)) {
    await chooseAQuestion();
  }
}

async function questionValid(category, question) {
  if (!board.has(category)) {
    return null;
  }

  if (!board.get(category).has(question)) {
    return null;
  }

  return board.get(category).get(question);
}

async function checkAnswer(checkQuestion) {
  rl.resume();
  let userAnswer = await rl.question(checkQuestion.question + "\n\t");
  userAnswer = userAnswer.toUpperCase();
  const answer = checkQuestion.answer.toUpperCase();
  if (userAnswer === answer) {
    addScore(checkQuestion.score);
    return;
  }
  await changePlayer(checkQuestion.answer);
}

async function changePlayer(answer) {
  console.log("WRONG! The correct answer was:\n\t" + answer);
  if (playerTurn === 1) {
    playerTurn = 2;
  } else {
    playerTurn = 1;
  }
}

async function addScore(score) {
  console.log("CORRECT! That's worth " + score + " points");
  if (playerTurn === 1) {
    player1Score += score;
  } else {
    player2Score += score;
  }
}

async function setQuestionVoid(checkQuestion) {
  let cat = checkQuestion.category.toUpperCase();
  cat = cat.replace(/_/g, " ");
  const string = checkQuestion.score.toString();
  const score = board.get(cat).get(string);
  score.score = "N/A";
  score.valid = false;
}

async function askQuestion(checkQuestion) {
  if (checkQuestion == null) {
    console.log("PLEASE ENTER A VALID CATEGORY AND QUESTION");
    return;
  }

  if (checkQuestion.valid) {
    await checkAnswer(checkQuestion);
    await setQuestionVoid(checkQuestion);
  } else {
    console.log("This question has already been asked. Please choose another");
    return false;
  }
}
