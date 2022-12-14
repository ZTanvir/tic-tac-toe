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
    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < 3; j++) {
                board[i][j] = "";
            }
        }
    };
    return { getboard, updateboard, resetBoard };
};
// Get platerName from index.html
let firstPlayerName = localStorage.getItem("player1Name");
let secondPlayerName = localStorage.getItem("player2Name");

// First player
// when counter = 1 => x , 0 => o
let counter = 0;
const clickBoard = GameBoard();
const winningMsgEl = document.querySelector(".winner-msg");
const playerTurnEl = document.querySelector(".player-turn");
const restartBtn = document.querySelector(".restart-btn");
const playAgain = document.querySelector(".play-again");

const Player = (playerName, playerSymbol) => {
    return { playerName, playerSymbol };
};
const player1 = Player(firstPlayerName, "x");
const player2 = Player(secondPlayerName, "o");

playerTurnEl.textContent = `${player1.playerName}'s turn symbol ${player1.playerSymbol}`;

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

const playerMove = (symbol) => {
    let selectboardEl = document.querySelectorAll(".item");
    let selectboardArr = [...selectboardEl];
    function bordUpdateOnClick(e) {
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
                e.target.style.backgroundColor = "#69D3e9";
                playerTurnEl.textContent = `${player2.playerName}'s turn ${player2.playerSymbol}`;
            } else if (counter % 2 != 0) {
                symbol = player2.playerSymbol;
                e.target.style.backgroundColor = "#F48530";
                playerTurnEl.textContent = `${player1.playerName}'s turn ${player1.playerSymbol}`;
            }
            clickBoard.updateboard(row, col, symbol);
            // console.log(clickBoard.getboard());
            counter++;
            renderboard(clickBoard.getboard());
            let result = checkWin(clickBoard.getboard());
            console.log(result);
            let draw = drawCheck(clickBoard.getboard());

            if (result !== "" && typeof result !== "undefined") {
                // User won't able to give their move
                selectboardArr.forEach((box) => {
                    box.removeEventListener("click", bordUpdateOnClick);
                });
                // Publish result on a modal,on top off gameboard
                if (result === "x") {
                    winningMsgEl.textContent = `${player1.playerName} has won!`;
                    playAgain.classList.toggle("result-msg");
                    playAgain.style.backgroundColor = "#69D3e9";
                    playerTurnEl.textContent = "";
                } else if (result === "o") {
                    winningMsgEl.textContent = `${player2.playerName} has won!`;
                    playAgain.classList.toggle("result-msg");
                    playAgain.style.backgroundColor = "#F48530";
                    playerTurnEl.textContent = "";
                }
            } else if (draw) {
                winningMsgEl.textContent = `It's a draw!`;
                playAgain.classList.toggle("result-msg");
                playAgain.style.backgroundColor = "#facca9";
                playerTurnEl.textContent = "";
            }
        }
    }
    selectboardArr.forEach((box) => {
        box.addEventListener("click", bordUpdateOnClick);
    });
};

const checkWin = (gameBordArray) => {
    //row check
    for (let row of gameBordArray) {
        if (!(row.includes("o") && row.includes("x")) && !row.includes("")) {
            console.log("row check:", row);
            return row[0];
        }
    }
    // column check
    let i = 0;
    let j = 0;
    for (let round = 0; round < 3; round++) {
        if (gameBordArray[i][j] == gameBordArray[i + 1][j]) {
            if (gameBordArray[i + 1][j] !== "") {
                if (gameBordArray[i + 1][j] == gameBordArray[i + 2][j]) {
                    return gameBordArray[i][j];
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
            if (gameBordArray[k][l] == gameBordArray[k + 1][l + 1]) {
                if (
                    gameBordArray[k + 1][l + 1] == gameBordArray[k + 2][l + 2]
                ) {
                    return gameBordArray[k][l];
                }
            }
        } // check 02,11,20 index
        else if (l == 2) {
            if (gameBordArray[k][l] == gameBordArray[k + 1][l - 1]) {
                if (
                    gameBordArray[k + 1][l - 1] == gameBordArray[k + 2][l - 2]
                ) {
                    return gameBordArray[k][l];
                }
            }
        }

        l += 2;
    }
};

const drawCheck = (gameBordArray) => {
    for (let row of gameBordArray) {
        for (let col of row) {
            if (col === "") {
                return false;
            }
        }
    }
    return true;
};

playerMove(player2.playerSymbol);

restartBtn.addEventListener("click", () => {
    playAgain.classList.toggle("result-msg");
    playerTurnEl.textContent = `${player1.playerName}'s turn symbol ${player1.playerSymbol}`;
    counter = 0;
    clickBoard.resetBoard();
    const removeBgColor = () => {
        let selectboardEl = document.querySelectorAll(".item");
        let selectboardArr = [...selectboardEl];
        for (let item of selectboardArr) {
            item.style.backgroundColor = "white";
        }
    };
    removeBgColor();
    renderboard(clickBoard.getboard());
    playerMove(player2.playerSymbol);
});
