window.addEventListener("load", init);

// * Global variables
// * Available Levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 2,
};

// Change level
const currentLevel = levels.easy;

let time = currentLevel;
let score = 0;
let isPlaying;

// * DOM elements
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");
const words = [
  "Banana",
  "Orange",
  "Apple",
  "Mango",
  "Terminator",
  "Slicer",
  "Ninja",
  "cow",
  "Robot",
  "littlegirl",
  "antifungal",
  "antifungals",
  "bifunctional",
  "cofunction",
  "cofunctions",
  "Finland",
  "Russia",
  "Latvia",
  "Lithuania",
  "Poland",
  "Afghanistan",
  "Albania",
  "Algeria",
  "American",
];

//* Iniaitilize the game
function init() {
  // * Show number of seconds
  seconds.innerHTML = currentLevel;
  // * Load word from the array
  showWord(words);
  // *Start matching on input
  wordInput.addEventListener("input", startMatch);
  //* Call Countdown every seconds
  setInterval(countdown, 1000);
  // * Check the status of the game
  setInterval(checkStatus, 50);
}
// *start match
function startMatch() {
  if (matchWords()) {
    console.log("matched");
    isPlaying = true;
    time = currentLevel;
    showWord(words);
    wordInput.value = "";
    score++;
  }
  // *if score is negative one display zero
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

// Match the current words
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = "correct";
    return true;
  } else {
    message.innerHTML = "";
    return false;
  }
}
// * Pick & show random words
function showWord(words) {
  const randIndex = Math.floor(Math.random() * words.length);
  currentWord.innerHTML = words[randIndex];
}
// *Countdown timer
function countdown() {
  // *Make sure time is runout
  if (time > 0) {
    // Decrement the time
    time--;
  } else if (time === 0) {
    isPlaying = false;
  }
  // Show time
  timeDisplay.innerHTML = time;
}

function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = "Game over!!";
    score = -1;
  }
}
