import axios from "axios";
import * as readline from "readline/promises";

const url = "http://localhost:4000/new-scoreboard";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let board = [];
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

async function chooseAQuestion() {
  let chosenQuestion;
  rl.resume();
  let chosenCategory = await rl.question(
    "Please choose a category by typing in its name:\n\t"
  );
  chosenCategory = chosenCategory.toUpperCase();
  if (
    chosenCategory == "HISTORY" ||
    chosenCategory == "MUSIC" ||
    chosenCategory == "SCIENCE" ||
    chosenCategory == "GEOGRAPHY" ||
    chosenCategory == "FILM AND TV"
  ) {
    chosenQuestion = await rl.question(
      "Please choose either 100, 200, or 300:\n\t"
    );
    if (
      chosenQuestion == "100" ||
      chosenQuestion == "200" ||
      chosenQuestion == "300"
    ) {
      rl.pause();
      const checkQuestion = await questionValid(chosenCategory, chosenQuestion);
      if (checkQuestion != null) {
        rl.resume();
        let userAnswer = await rl.question(
          board[checkQuestion].question + "\n\t"
        );
        userAnswer = userAnswer.toUpperCase();
        const answer = board[checkQuestion].answer.toUpperCase();
        if (userAnswer === answer) {
          console.log(
            "CORRECT! That's worth " + board[checkQuestion].score + " points"
          );
          if (playerTurn === 1) {
            player1Score += board[checkQuestion].score;
          } else {
            player2Score += board[checkQuestion].score;
          }
        } else {
          console.log(
            "WRONG! The correct answer was:\n\t" + board[checkQuestion].answer
          );
          if (playerTurn === 1) {
            playerTurn = 2;
          } else {
            playerTurn = 1;
          }
        }

        board[checkQuestion].score = "N/A";
        board[checkQuestion].valid = false;
        return;
      } else {
        console.log(
          "This question has already been asked. Please choose another"
        );
        await chooseAQuestion();
      }
    } else {
      console.log("Your entry was invalid. Please try again");
      await chooseAQuestion();
    }
  } else {
    console.log("Your entry was invalid. Please try again");
    await chooseAQuestion();
    rl.pause();
  }
}

async function questionValid(category, question) {
  let index = 0;
  if (category == "HISTORY") {
    index += 0;
  } else if (category == "MUSIC") {
    index += 3;
  } else if (category == "SCIENCE") {
    index += 6;
  } else if (category == "GEOGRAPHY") {
    index += 9;
  } else if (category == "FILM AND TV") {
    index += 12;
  }

  if (question == "100") {
    index += 0;
  } else if (question == "200") {
    index += 1;
  } else if (question == "300") {
    index += 2;
  }

  if (board[index].valid) {
    return index;
  }

  return null;
}
