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
  ["o", "x", "x"],
  ["o", "x", "x"],
  ["x", "o", "o"],
];
const checkWinOrDraw = (gameBordArray) => {
  //row check
  for (let row of gameLogic) {
    if (!(row.includes("o") && row.includes("x")) && !row.includes("")) {
      console.log("row check:", row);
      return row;
    }
  }
  // column check
  let i = 0;
  let j = 0;
  for (let round = 0; round < 3; round++) {
    if (!gameLogic[round].includes("")) {
      if (gameLogic[i][j] == gameLogic[i + 1][j]) {
        if (gameLogic[i + 1][j] == gameLogic[i + 2][j]) {
          console.log("column check:", gameLogic[i][j]);
          return gameLogic[i][j];
        }
      }
    }
    j++;
  }
  // cross check
  let k = 0;
  let l = 0;
  for (let round = 0; round < 2; round++) {
    // check 00,11,22 index
    if (l == 0) {
      if (gameLogic[k][l] == gameLogic[k + 1][l + 1]) {
        if (gameLogic[k + 1][l + 1] == gameLogic[k + 2][l + 2]) {
          console.log("left cross", gameLogic[k][l]);
          return gameLogic[k][l];
        }
      }
    } // check 02,11,20 index
    else if (l == 2) {
      if (gameLogic[k][l] == gameLogic[k + 1][l - 1]) {
        if (gameLogic[k + 1][l - 1] == gameLogic[k + 2][l - 2]) {
          console.log("Right cross:", gameLogic[k][l]);
          return gameLogic[k][l];
        }
      }
    }

    l += 2;
  }
};
let result = checkWinOrDraw(gameLogic);
console.log(result);
// // row check
// for (let row of gameLogic) {
//   if (!(row.includes("o") && row.includes("x")) && !row.includes("")) {
//     console.log(row);
//   }
// }
// // column check
// let i = 0;
// let j = 0;
// for (let round = 0; round < 3; round++) {
//   if (!gameLogic[round].includes("")) {
//     if (gameLogic[i][j] == gameLogic[i + 1][j]) {
//       if (gameLogic[i + 1][j] == gameLogic[i + 2][j]) {
//         console.log(gameLogic[i][j]);
//         break;
//       }
//     }
//   }
//   j++;
// }
// // cross check
// let k = 0;
// let l = 0;
// for (let round = 0; round < 2; round++) {
//   if (!gameLogic[round].includes("")) {
//     console.log("l value", l);
//     // check 00,11,22 index
//     if (l == 0) {
//       console.log("left kl", k, l);
//       if (gameLogic[k][l] == gameLogic[k + 1][l + 1]) {
//         if (gameLogic[k + 1][l + 1] == gameLogic[k + 2][l + 2]) {
//           console.log(gameLogic[k][l]);
//         }
//       }
//     } // check 02,11,20 index
//     else if (l == 2) {
//       console.log("right kl", k, l);
//       if (gameLogic[k][l] == gameLogic[k + 1][l - 1]) {
//         if (gameLogic[k + 1][l - 1] == gameLogic[k + 2][l - 2]) {
//           console.log(gameLogic[k][l]);
//         }
//       }
//     }
//   }
//   l += 2;
// }
