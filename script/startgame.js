const player1input = document.querySelector("#p1name");
const player2input = document.querySelector("#p2name");
const twoPlayersBtn = document.querySelector(".two-players");
const inputFields = document.querySelector(".player-names");
const playNowSection = document.querySelector(".play-now");
const playNowBtn = document.querySelector(".play-now-btn");

let player1Name = "";
let player2Name = "";
console.log(inputFields, playNowSection, playNowBtn);


twoPlayersBtn.addEventListener("click", () => {
    inputFields.classList.toggle("hide-input-btn");
    playNowSection.classList.toggle("hide-input-btn");
})
playNowBtn.addEventListener("click", () => {
    player1Name = player1input.value;
    player2Name = player2input.value;
    console.log(player1Name, player2Name);
})
