import express from "express";
import axios from "axios";

const app = express();

app.get("/new-scoreboard", async (req, res) => {
  const scoreboard = new Scoreboard();
  let sb = await scoreboard.setBoard();
  res.send(sb);
});

class Scoreboard {
  board = [];
  score;
  baseURL = "https://the-trivia-api.com/v2/questions?";
  categories = "";
  difficulties = "";
  limit = "";
  valid;

  setBoard = async () => {
    try {
      for (let i = 0; i < 15; i++) {
        switch (i) {
          case 0:
            this.categories = "categories=history";
            this.difficulties = "difficulties=easy";
            this.limit = "limit=1";
            this.score = 100;
            this.valid = true;
            break;
          case 1:
            this.categories = "categories=history";
            this.difficulties = "difficulties=medium";
            this.limit = "limit=1";
            this.score = 200;
            this.valid = true;
            break;
          case 2:
            this.categories = "categories=history";
            this.difficulties = "difficulties=hard";
            this.limit = "limit=1";
            this.score = 300;
            this.valid = true;
            break;
          case 3:
            this.categories = "categories=music";
            this.difficulties = "difficulties=easy";
            this.limit = "limit=1";
            this.score = 100;
            this.valid = true;
            break;
          case 4:
            this.categories = "categories=music";
            this.difficulties = "difficulties=medium";
            this.limit = "limit=1";
            this.score = 200;
            this.valid = true;
            break;
          case 5:
            this.categories = "categories=music";
            this.difficulties = "difficulties=hard";
            this.limit = "limit=1";
            this.score = 300;
            this.valid = true;
            break;
          case 6:
            this.categories = "categories=science";
            this.difficulties = "difficulties=easy";
            this.limit = "limit=1";
            this.score = 100;
            this.valid = true;
            break;
          case 7:
            this.categories = "categories=science";
            this.difficulties = "difficulties=medium";
            this.limit = "limit=1";
            this.score = 200;
            this.valid = true;
            break;
          case 8:
            this.categories = "categories=science";
            this.difficulties = "difficulties=hard";
            this.limit = "limit=1";
            this.score = 300;
            this.valid = true;
            break;
          case 9:
            this.categories = "categories=geography";
            this.difficulties = "difficulties=easy";
            this.limit = "limit=1";
            this.score = 100;
            this.valid = true;
            break;
          case 10:
            this.categories = "categories=geography";
            this.difficulties = "difficulties=medium";
            this.limit = "limit=1";
            this.score = 200;
            this.valid = true;
            break;
          case 11:
            this.categories = "categories=geography";
            this.difficulties = "difficulties=hard";
            this.limit = "limit=1";
            this.score = 300;
            this.valid = true;
            break;
          case 12:
            this.categories = "categories=film_and_tv";
            this.difficulties = "difficulties=easy";
            this.limit = "limit=1";
            this.score = 100;
            this.valid = true;
            break;
          case 13:
            this.categories = "categories=film_and_tv";
            this.difficulties = "difficulties=medium";
            this.limit = "limit=1";
            this.score = 200;
            this.valid = true;
            break;
          case 14:
            this.categories = "categories=film_and_tv";
            this.difficulties = "difficulties=hard";
            this.limit = "limit=1";
            this.score = 300;
            this.valid = true;
            break;
        }
        this.request = await axios.get(
          this.baseURL +
            this.categories +
            "&" +
            this.difficulties +
            "&" +
            this.limit
        );
        this.response = this.request.data;
        this.board.push({
          question: this.response[0].question.text,
          answer: this.response[0].correctAnswer,
          score: this.score,
          valid: this.valid,
        });
      }
    } catch (error) {
      console.log("Failed to connect to server: " + error.message);
    }
    return this.board;
  };
}

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
