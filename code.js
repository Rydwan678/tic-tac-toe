// enemy (ai or local)
let player = localStorage.getItem("storageSelectedPlayer");
//storage variables
let storageSelectedPlayer = undefined;
let storagePlayerSymbol = undefined;
let storageComputerSymbol = undefined;
// symbols ("x" and "o")
let playerSymbol = localStorage.getItem("storagePlayerSymbol");
let computerSymbol = localStorage.getItem("storageComputerSymbol");
// states of field ["x", "o", null]
let fields = [null, null, null, null, null, null, null, null, null];
// winning situations
const winSituations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let win = false;

function selectPlayer(selectedPlayer) {
  console.log(selectedPlayer);
  if (selectedPlayer == "ai") {
    player = "ai";
    localStorage.setItem("storageSelectedPlayer", player);
    window.location = "chooseSymbolSite.html";
  } else if (selectedPlayer == "local") {
    player = "local";
    localStorage.setItem("storageSelectedPlayer", player);
    window.location = "chooseSymbolSite.html";
  }
}

function selectSymbol(selectedSymbol) {
  if (selectedSymbol == "cross") {
    playerSymbol = "x";
    computerSymbol = "o";
    localStorage.setItem("storagePlayerSymbol", playerSymbol);
    localStorage.setItem("storageComputerSymbol", computerSymbol);
  } else if (selectedSymbol == "circle") {
    playerSymbol = "o";
    computerSymbol = "x";
    localStorage.setItem("storagePlayerSymbol", playerSymbol);
    localStorage.setItem("storageComputerSymbol", computerSymbol);
  }
  console.log(playerSymbol);
  window.location = "gameSite.html";
}

function playerMove(selectedField) {
  console.log(player);
  document.getElementById(`field${selectedField}`).value = playerSymbol;
  document.getElementById(`field${selectedField}`).disabled = true;
  document.getElementById(`field${selectedField}`).className =
    "gameFieldChoosen";
  document.getElementById(`field${selectedField}`).style.color =
    "rgb(255, 125, 238)";
  fields[selectedField] = playerSymbol;
  checkWin("playerWin");
  console.log(fields);
  if (player == "ai" && win == false) {
    setTimeout(computerMove, 1500);
  }
}

function computerMove() {
  let computerField = Math.floor(Math.random() * 9);
  if (fields[computerField] == null) {
    document.getElementById(`field${computerField}`).value = computerSymbol;
    document.getElementById(`field${computerField}`).className =
      "gameFieldChoosen";
    document.getElementById(`field${computerField}`).disabled = true;
    document.getElementById(`field${computerField}`).style.color =
      "rgb(148, 243, 255)";
    fields[computerField] = computerSymbol;
    checkWin("computerWin");
    console.log(fields);
  } else if (fields[computerField] !== null) {
    computerMove();
  }
}

function checkWin(winner) {
  if (winner == "playerWin") {
    for (let i = 0; i < winSituations.length; i++) {
      let counter = 0;
      if (fields[winSituations[i][0]] == playerSymbol) {
        counter++;
        console.log("dad", counter, fields[winSituations[i][0]]);
      }
      if (fields[winSituations[i][1]] == playerSymbol) {
        counter++;
        console.log("dad", counter, fields[winSituations[i][1]]);
      }
      if (fields[winSituations[i][2]] == playerSymbol) {
        counter++;
        console.log("dad", counter, fields[winSituations[i][2]]);
      }
      if (counter == 3) {
        win = true;
        console.log("Wygrales");
        document.getElementById("win").innerHTML = "Wygrałeś!";
        document.getElementById("win").style.color = "rgb(50, 255, 0)";
        document.getElementById("win").style.display = "block";
        document.getElementById("playAgain").style.display = "block";
        for (i = 0; i < 9; i++) {
          document.getElementById(`field${i}`).disabled = true;
          document.getElementById(`field${i}`).className = "gameFieldChoosen";
        }
        break;
      }
    }
  }
  if (winner == "computerWin") {
    for (let i = 0; i < winSituations.length; i++) {
      let counter = 0;
      if (fields[winSituations[i][0]] == computerSymbol) {
        counter++;
        console.log("dad", counter, fields[winSituations[i][0]]);
      }
      if (fields[winSituations[i][1]] == computerSymbol) {
        counter++;
        console.log("dad", counter, fields[winSituations[i][1]]);
      }
      if (fields[winSituations[i][2]] == computerSymbol) {
        counter++;
        console.log("dad", counter, fields[winSituations[i][2]]);
      }
      if (counter == 3) {
        win = true;
        console.log("Przegrales");
        document.getElementById("win").innerHTML = "Przegrałeś";
        document.getElementById("win").style.color = "red";
        document.getElementById("win").style.display = "block";
        document.getElementById("playAgain").style.display = "block";
        break;
      }
    }
  }
}
