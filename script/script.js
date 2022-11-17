const gameboard = function () {
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

const playerMove = (symbol) => {
    let selectboardEl = document.querySelectorAll(".item");
    let selectboardArr = [...selectboardEl];
    const ticboard = gameboard();
    selectboardArr.forEach((box) => {
        box.addEventListener("click", function (e) {
            console.log(e.target);
            // Only able to add item it no move has made to that box
            // means when the box is empty
            if (e.target.textContent == "") {
                let boxIndex = e.target.dataset.rowcol;
                boxIndex = boxIndex.split("");
                let row = Number(boxIndex[0]);
                let col = Number(boxIndex[1]);
                ticboard.updateboard(row, col, symbol);
                console.log(ticboard.getboard());
                renderboard(ticboard.getboard());
            }
        });
    });
};

playerMove("-");

let mainboard = gameboard();
renderboard(mainboard.getboard());
