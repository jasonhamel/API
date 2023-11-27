import axios from "axios";
import * as readline from "readline/promises";

const url = "http://localhost:4000/new-scoreboard";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let board = [];
let chosenQuestion;
let player1Score = 0;
let player2Score = 0;
let playerTurn = 1;

await startApp();
showState();
await showBoard();

async function startApp() {
  board = await axios.get(url);
  board = board.data;
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
  rl.close();
}

function showState() {
  console.log("\n\n\tPlayer 1 score: " + player1Score);
  console.log("\n\n\tPlayer 2 score: " + player2Score + "\n\n");
}

async function showBoard() {
  console.log(
    "| **History** | **Music** | **Science** | **Geography** | **Film and TV** |"
  );
  console.log(
    "|     " +
      board[0].score +
      "     |    " +
      board[3].score +
      "    |     " +
      board[6].score +
      "     |      " +
      board[9].score +
      "      |       " +
      board[12].score +
      "       |"
  );
  console.log(
    "|     " +
      board[1].score +
      "     |    " +
      board[4].score +
      "    |     " +
      board[7].score +
      "     |      " +
      board[10].score +
      "      |       " +
      board[13].score +
      "       |"
  );
  console.log(
    "|     " +
      board[2].score +
      "     |    " +
      board[5].score +
      "    |     " +
      board[8].score +
      "     |      " +
      board[11].score +
      "      |       " +
      board[14].score +
      "       |"
  );
}
