const GameBoard = function () {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const getboard = () => {
    return board;
  };
  const updateboard = (row, col, value) => {
    board[row][col] = value;
  };
  return { getboard, updateboard };
};
const renderboard = function (board) {
  let selectboardEl = document.querySelectorAll(".item");
  let selectboardArr = [...selectboardEl];
  let boardCounter = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < 3; j++) {
      selectboardArr[boardCounter].textContent = board[i][j];
      boardCounter++;
    }
  }
};
// First player
let counter = 1;
const clickBoard = GameBoard();

const playerMove = (symbol) => {
  let selectboardEl = document.querySelectorAll(".item");
  let selectboardArr = [...selectboardEl];
  function bordUpdateOnClick(e) {
    console.log(e.target);
    // Only able to add item it no move has made to that box
    // means when the box is empty
    if (e.target.textContent == "") {
      let boxIndex = e.target.dataset.rowcol;
      boxIndex = boxIndex.split("");
      let row = Number(boxIndex[0]);
      let col = Number(boxIndex[1]);
      // Change game symbol based on user turn number
      if (counter % 2 == 0) {
        symbol = player1.playerSymbol;
      } else if (counter % 2 != 0) {
        symbol = player2.playerSymbol;
      }
      clickBoard.updateboard(row, col, symbol);
      console.log(clickBoard.getboard());
      counter++;
      renderboard(clickBoard.getboard());
    }
  }
  selectboardArr.forEach((box) => {
    box.addEventListener("click", bordUpdateOnClick);
  });
};

const Player = (playerName, playerSymbol) => {
  return { playerName, playerSymbol };
};
const player1 = Player("player1", "o");
const player2 = Player("player2", "x");
playerMove(player2.playerSymbol);

// Check row and column are same
let gameLogic = [
  ["x", "o", "x"],
  ["o", "o", "o"],
  ["x", "o", "x"],
];
// row check
for (let row of gameLogic) {
  if (!(row.includes("o") && row.includes("x")) && !row.includes("")) {
    console.log(row);
  }
}
// column check
let i = 0;
let j = 0;
for (let round = 0; round < gameLogic.length; round++) {
  if (!gameLogic[round].includes("")) {
    if (gameLogic[i][j] == gameLogic[i + 1][j]) {
      if (gameLogic[i + 1][j] == gameLogic[i + 2][j]) {
        console.log(gameLogic[i][j]);
        break;
      }
    }
  }
  j++;
}
