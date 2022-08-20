let scoreKen = 0;
let scorePlayer = 0;
let timeOut = "";

let ken = document.getElementById("ninja-ken");

let splashScreen = document.getElementsByClassName("splash")[0];
let startGame = document.getElementsByClassName("start")[0];
let displayScoreKen = document.getElementsByClassName("score-ken")[0];
let displayScorePlayer = document.getElementsByClassName("score-player")[0];

let reset = document.getElementById("reset");
let rock = document.getElementById("rock");
let scissors = document.getElementById("scissors");
let paper = document.getElementById("paper");

if (localStorage.getItem("scoreKen")) {
    scoreKen = localStorage.getItem("scoreKen");
    displayScoreKen.innerHTML = scoreKen;
}

if (localStorage.getItem("scorePlayer")) {
    scorePlayer = localStorage.getItem("scorePlayer");
    displayScorePlayer.innerHTML = scorePlayer;
}

startGame.addEventListener("click", () => {
    splashScreen.style.top = "-120vh";
    splashScreen.style.transition = ".75s";
});

rock.addEventListener("click", () => {
    janken(0);
});

scissors.addEventListener("click", () => {
    janken(1);
});

paper.addEventListener("click", () => {
    janken(2);
});

reset.addEventListener("click", () => {
    if (confirm("The game will restart, are you sure?")) {
        scoreKen = 0;
        scorePlayer = 0;
        displayScoreKen.innerHTML = scoreKen;
        displayScorePlayer.innerHTML = scorePlayer;
        localStorage.clear();
    };
});

function janken(hand) {
    let fingerKen = Math.floor(Math.random() * 3);

    switch (fingerKen) {
        case 0:
            ken.style.backgroundImage = "url(res/ken-rock.png)";
            break;
        case 1:
            ken.style.backgroundImage = "url(res/ken-scissors.png)";
            break;
        default:
            ken.style.backgroundImage = "url(res/ken-paper.png)";
            break;    
    }

    ken.classList.remove("shake");

    switch (hand) {
        case 0:
            if (fingerKen == 0) {
                result("draw");
            } else if (fingerKen == 1) {
                result("player");
            } else {
                result("ken");
            }
            break;
        case 1:
            if (fingerKen == 0) {
                result("ken");
            } else if (fingerKen == 1) {
                result("draw");
            } else {
                result("player");
            }
            break;
        default:
            if (fingerKen == 0) {
                result("player");
            } else if (fingerKen == 1) {
                result("ken");
            } else {
                result("draw");
            }
            break;
    }
}

function result(who) {
    clearTimeout(timeOut);

    switch (who) {
        case "ken":
            scoreKen++;
            localStorage.setItem("scoreKen", scoreKen);
            displayScoreKen.innerHTML = scoreKen;
            console.log("Ninja-Ken Win 🎉");
            break;
        case "player":
            scorePlayer++;
            localStorage.setItem("scorePlayer", scorePlayer);
            displayScorePlayer.innerHTML = scorePlayer;
            console.log("You Win 🎉");
            break;
        default:
            console.log("Draw");
            break;
    }

    timeOut = setTimeout(() => {
        ken.style.removeProperty("background-image");
        ken.classList.add("shake");
    }, 3000);
}

