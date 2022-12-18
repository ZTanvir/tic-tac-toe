const player1input = document.querySelector("#p1name");
const player2input = document.querySelector("#p2name");
const twoPlayersBtn = document.querySelector(".two-players");
const inputFields = document.querySelector(".player-names");
const playNowSection = document.querySelector(".play-now");
const playNowBtn = document.querySelector(".play-now-btn");
localStorage.clear();

let player1Name = "";
let player2Name = "";

const hideBtn = (() => {
    twoPlayersBtn.addEventListener("click", () => {
        inputFields.classList.toggle("hide-input-btn");
        playNowSection.classList.toggle("hide-input-btn");
    });
})();
const getName = (() => {
    playNowBtn.addEventListener("click", () => {
        player1Name = player1input.value;
        player2Name = player2input.value;
        localStorage.setItem("player1Name", player1Name);
        localStorage.setItem("player2Name", player2Name);
    });
})();

player2input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        playNowBtn.click();
    }
});
