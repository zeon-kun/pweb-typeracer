const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const wordElement = document.getElementById("word");
const userInput = document.getElementById("userInput");
const startButton = document.getElementById("startButton");
const scoreElement = document.getElementById("score");
const healthElement = document.getElementById("health");

const words = [
  "apple",
  "banana",
  "cherry",
  "date",
  "elderberry",
  "fig",
  "grape",
  "honeydew",
  "kiwi",
  "lemon",
  "mango",
  "orange",
  "papaya",
  "quince",
  "raspberry",
  "strawberry",
  "tangerine",
  "ugli fruit",
  "watermelon",
  "avocado",
  "blueberry",
  "blackberry",
  "cantaloupe",
  "coconut",
  "dragonfruit",
  "grapefruit",
  "guava",
  "lime",
  "lychee",
  "passion fruit",
  "pear",
  "pineapple",
  "pomegranate",
  "plum",
  "apricot",
  "blackcurrant",
  "boysenberry",
  "cranberry",
  "currant",
  "gooseberry",
  "huckleberry",
  "mulberry",
  "nectarine",
  "persimmon",
  "pitaya",
  "kiwifruit",
  "starfruit",
  "almond",
  "cashew",
  "hazelnut",
  "walnut",
  "pecan",
  "pistachio",
  "macadamia",
  "peanut",
  "almond",
  "acorn",
  "chestnut",
  "birch",
  "cedar",
  "cherry",
  "elm",
  "fir",
  "oak",
  "maple",
  "pine",
  "poplar",
  "willow",
  "spruce",
  "ash",
  "juniper",
  "sycamore",
  "sequoia",
  "redwood",
  "mahogany",
  "teak",
  "bamboo",
  "pine",
  "cedar",
  "oak",
  "walnut",
  "cherry",
  "maple",
  "birch",
  "hickory",
  "poplar",
  "spruce",
  "ebony",
  "rosewood",
  "beech",
  "balsa",
  "cork",
  "rattan",
  "willow",
  "birch",
  "cherry",
  "elm",
  "fir",
  "cedar",
  "hickory",
  "maple",
  "oak",
  "pine",
  "poplar",
  "redwood",
  "sequoia",
  "walnut",
  "rosewood",
  "mahogany",
  "teak",
  "ash",
  "juniper",
  "sycamore",
  "cedar",
  "pine",
  "oak",
  "maple",
  "birch",
  "hickory",
  "willow",
  "spruce",
  "ebony",
  "beech",
  "alder",
  "cherry",
  "chestnut",
  "poplar",
  "tamarind",
  "banyan",
  "magnolia",
  "eucalyptus",
  "olive",
  "camphor",
  "cottonwood",
  "kapok",
  "sycamore",
  "sequoia",
  "redwood",
  "boxelder",
  "birch",
  "cedar",
  "spruce",
  "fir",
  "maple",
  "oak",
  "pine",
  "teak",
  "walnut",
  "cherry",
  "poplar",
  "hickory",
  "willow",
  "beech",
  "chestnut",
  "larch",
  "locust",
  "alder",
  "mulberry",
  "sycamore",
  "sequoia",
  "redwood",
  "spruce",
  "walnut",
  "hickory",
  "birch",
  "beech",
  "cedar",
  "oak",
  "pine",
  "teak",
  "cherry",
  "maple",
  "poplar",
  "willow",
  "eucalyptus",
  "mahogany",
  "sycamore",
  "ash",
  "larch",
  "locust",
  "olive",
  "tamarind",
  "banyan",
  "camphor",
  "cottonwood",
  "kapok",
  "boxelder",
  "palm",
  "cypress",
  "redcedar",
  "redwood",
  "whitecedar",
  "yew",
  "hemlock",
  "blackwood",
  "ebony",
  "lignumvitae",
  "zebrawood",
  "sandalwood",
];

let currentWordIndex = 0;
let currentWord = getRandomWord();
let startTime;
let gameActive = false;
let score = 0;
let health = 100;
let gameInterval;
let carX = 0;

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

function drawWord() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "24px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(currentWord, 10, canvas.height / 2);
}

let lastInputTime;
const timeToLose = 3000; // 3 seconds in milliseconds

function checkInput() {
  const userInputValue = userInput.value.trim();

  if (userInputValue === currentWord.substr(0, userInputValue.length)) {
    // The entered input matches the start of the current word.
    if (userInputValue === currentWord) {
      score += 10;
      scoreElement.textContent = score; // Update the displayed score
      checkWin(); // Check if the user has won

      if (currentWordIndex < words.length - 1) {
        currentWord = getRandomWord(); // Get a new random word
        userInput.value = "";
        drawWord();
        drawCar(); // Ensure the car is drawn at the correct starting position
      } else {
        clearInterval(gameInterval);
        endGame(true);
      }
    }
  } else {
    // The entered input does not match the start of the current word.
    health -= 10;
    healthElement.textContent = health;

    if (health <= 0) {
      clearInterval(gameInterval);
      endGame(false);
    }
  }

  // Update the last input time.
  lastInputTime = new Date().getTime();

  // Set a timeout to check if the user hasn't typed for 3 seconds.
  setTimeout(() => {
    const currentTime = new Date().getTime();
    if (currentTime - lastInputTime >= timeToLose) {
      clearInterval(gameInterval);
      endGame(false);
    }
  }, timeToLose);
}

function checkWin() {
  if (score >= 100) {
    clearInterval(gameInterval);
    endGame(true);
  }
}

function startGame() {
  if (!gameActive) {
    gameActive = true;
    userInput.value = "";
    score = 0;
    health = 100;
    carX = 0; // Reset the car's position to 0
    currentWord = getRandomWord(); // Get a random word
    drawWord();
    drawCar(); // Ensure the car is drawn at the correct starting position
    startTime = new Date();
    userInput.focus();
    userInput.addEventListener("input", checkInput);
    gameInterval = setInterval(moveCar, 10);
  }
}

function moveCar() {
  carX += 1;
  if (carX >= canvas.width) {
    carX = 0;
  }
  drawCar();
}

function drawCar() {
  ctx.clearRect(0, canvas.height - 50, canvas.width, 50); // Clear the previous car
  ctx.fillStyle = "blue";
  ctx.fillRect(carX, canvas.height - 30, 40, 20);
}

function endGame(win) {
  gameActive = false;
  userInput.removeEventListener("input", checkInput);
  if (win) {
    wordElement.innerHTML = `Congratulations! You won with a score of ${score}.`;
  } else {
    wordElement.innerHTML = "Game over. You lost.";
  }
}

startButton.addEventListener("click", startGame);
