const gameBord = function () {
    let bord = [
        ["o", "x", "o"],
        ["x", "o", "x"],
        ["o", "o", " x"],
    ];
    const getBord = () => {
        return bord;
    };
    const updateBord = (row, col, value) => {
        bord[row][col] = value;
    };
    return { getBord, updateBord };
};
const renderBord = function (bord) {
    let selectBordEl = document.querySelectorAll(".item");
    let selectBordArr = [...selectBordEl];
    let bordCounter = 0;
    for (let i = 0; i < bord.length; i++) {
        for (let j = 0; j < 3; j++) {
            selectBordArr[bordCounter].textContent = bord[i][j];
            bordCounter++;
        }
    }
};

let mainBord = gameBord();
renderBord(mainBord.getBord());
