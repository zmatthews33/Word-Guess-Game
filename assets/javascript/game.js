// Bands

var bands = [
  /* "JIMI$HENDRIX$EXPERIENCE",
  "THE$WHO",
  "LED$ZEPPELIN",
  "PINK$FLOYD",
  "THE$BEATLES",
  "THE$ROLLING$STONES",
  "THE$DOORS",
  "THE$BEACH$BOYS",
  "GRATEFUL$DEAD",
  "JEFFERSON$AIRPLANE",
  "THE$ANIMALS",*/
  "CREAM"
];

var numbOfTries = 10;

var lettersGuessed = [];
var currentWordIndex;
var guessingWord = [];
var guessesRemaining = 0;
var gameOver = false;
var wins = 0;

var winSound = new Audio("./assets/sounds/...");
var loseSound = new Audio("./assets/sounds/losetrombone.wav");

function resetGame() {
  //resets game
  guessesRemaining = numbOfTries;

  function bandsNoSpaces() {
    var bands = document.getElementById("currentWord").innerHTML;
    var bandsNoSpaces = bands.replace("$", "");
    document.getElementById("currentWord").innerHTML = bandsNoSpaces;
  }

  bandsNoSpaces();

  currentWordIndex = Math.floor(Math.random() * bands.length);

  lettersGuessed = [];
  guessingWord = [];

  document.getElementById("hangmanImage").src = "assets/images/0.png";

  for (var i = 0; i < bands[currentWordIndex].length; i++) {
    guessingWord.push("_");
  }

  document.getElementById("pressKeyTryAgain").style.cssText = "display: none";
  document.getElementById("gameover").style.cssText = "display: none";
  document.getElementById("youwin").style.cssText = "display: none";

  updateDisplay();
}

function updateDisplay() {
  document.getElementById("winsTotal").innerText = wins;

  var guessingWordText = " ";
  for (var i = 0; i < guessingWord.length; i++) {
    guessingWordText += guessingWord[i];
  }

  document.getElementById("currentWord").innerText = guessingWordText;
  document.getElementById("guessesRemaining").innerText = guessesRemaining;
  document.getElementById("lettersGuessed").innerText = lettersGuessed;
}

function updateHangmanImage() {
  document.getElementById("hangmanImage").src =
    "assets/images/" + (numbOfTries - guessesRemaining) + ".png";
}

function evaluateGuess(letter) {
  var positions = [];

  for (var i = 0; i < bands[currentWordIndex].length; i++) {
    if (bands[currentWordIndex][i] === letter) {
      positions.push(i);
    }
  }

  if (positions.length <= 0) {
    guessesRemaining--;
    updateHangmanImage();
  } else {
    for (var i = 0; i < positions.length; i++) {
      guessingWord[positions[i]] = letter;
    }
  }
}

function checkWin() {
  if (guessingWord.indexOf("_") === -1) {
    document.getElementById("youwin").style.cssText = "display: block";
    document.getElementById("pressKeyTryAgain").style.cssText =
      "display: block";
    wins++;
    winSound.play();
    gameOver = true;
  }
}

function checkLoss() {
  if (guessesRemaining <= 0) {
    loseSound.play();
    document.getElementById("gameover").style.cssText = "display: block";
    document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
    gameOver = true;
  }
}

function playerGuess(letter) {
  if (guessesRemaining > 0) {
    if (lettersGuessed.indexOf(letter) === -1) {
      lettersGuessed.push(letter);
      evaluateGuess(letter);
    }
  }
}

document.onkeydown = function(event) {
  if (gameOver) {
    resetGame();
    gameOver = false;
  } else {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      playerGuess(event.key.toUpperCase());
      updateDisplay();
      checkWin();
      checkLoss();
    }
  }
};
