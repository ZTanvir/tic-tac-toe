const gameBord = function () {
  let bord = [
    ["o", "x", "o"],
    ["x", "o", "x"],
    ["o", "o", " x"],
  ];
  const updateBord = (row, col, value) => {
    bord[row][col] = value;
    console.log(bord);
  };
  const getBord = () => {
    return bord;
  };
  return { bord, getBord, updateBord };
};
gameBord().updateBord(0, 0, "A");
console.log(gameBord().getBord());

const renderBord = function () {
  let bord = gameBord().bord;
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

renderBord();
