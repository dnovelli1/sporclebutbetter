// const { response } = require("express");


const testObject = {
    id: 7,
    name: "Antarctica",
    countries: [
        {
            id: 2,
            name: "South Georgia and South Sandwich Islands",
            capital: "King Edward Point",
            continent_id: 7
        },
        {
            id: 3,
            name: "French Southern and Antarctic Lands",
            capital: "Port-aux-Français",
            continent_id: 7
        }
    ]
};
// ------ ALL FUNCTIONS ------------------------------------------
// Main Game Function
function mainGame(continent_id) {
    // Fetch Game Data
    fetch(`/gamepage/${continent_id}`, { "method": "GET" })
    .then(response => {
        return response.json();
    })
    .then(data => {

        console.log(data);

        // Start Game

    });
};

// RenderGroup


// ------ ALL LISTENERS ------------------------------------------
// GAME START per continent
document.getElementById("game-1").addEventListener("click", function (event) {
    event.preventDefault();
    mainGame(1);
});

document.getElementById("game-2").addEventListener("click", function (event) {
    event.preventDefault();
    mainGame(2);
});

document.getElementById("game-3").addEventListener("click", function (event) {
    event.preventDefault();
    mainGame(3);
});

document.getElementById("game-4").addEventListener("click", function (event) {
    event.preventDefault();
    mainGame(4);
});

document.getElementById("game-5").addEventListener("click", function (event) {
    event.preventDefault();
    mainGame(5);
});

document.getElementById("game-6").addEventListener("click", function (event) {
    event.preventDefault();
    mainGame(6);
});

document.getElementById("game-7").addEventListener("click", function (event) {
    event.preventDefault();
    mainGame(7);
});





// ------ CODEPEN ------------------------------------------------
const testObject = {
    id: 7,
    name: "Antarctica",
    countries: [
        {
            id: 2,
            name: "South Georgia and South Sandwich Islands",
            capital: "King Edward Point",
            continent_id: 7
        },
        {
            id: 3,
            name: "French Southern and Antarctic Lands",
            capital: "Port-aux-Français",
            continent_id: 7
        }
    ]
};
// Global Pointers
const capDisplay =  document.getElementById("capitalContainer");
const cList =       document.getElementById("countryContainer");
const startButton = document.getElementById("buttonGroup");
const scoreButton = document.getElementById("endScreen");

// Global Variables
let randSeq = [];
let randomizedCapitals = [];
let gameStarted = false;
let capitalIndex = 0;
let gameCapID = 0;
let score = 0;
let stopTime = 0;

// Test Game Start
document.getElementById("game-7").addEventListener("click", function (event) {
  event.preventDefault();
  scoreButton.innerHTML = "";
  gameStarted = true;
  score = 0;
  stopTime = 0;
  displayButton(false);
  displayEndScreen(false);
  renderGroup(testObject);
});

// INIT
init();
function init() {
  displayButton(true);
  displayEndScreen(false);
};

// Show and Hide Start Button
function displayButton(displayed){
  if(displayed === true) {
    startButton.style.setProperty('display', 'initial');
  } else if (displayed === false) {
    startButton.style.setProperty('display', 'none');
  };
};

// Show and Hide End Screen
function displayEndScreen(displayed){
    if(displayed === true) {
    scoreButton.style.setProperty('display', 'initial');
  } else if (displayed === false) {
    scoreButton.style.setProperty('display', 'none');
  };
};

// Render Group
function renderGroup(quizData) {
  
  shuffleCapitals(quizData);
  renderCountries(quizData);
  
  // Display First Capital
  capitalIndex = 0;
  renderCapital();

  // Start Timer
  gameTimer();
};

// Randomize Capitals
function shuffleCapitals (data){
  // Generate Random Sequence for displaying Capitals
  randSeq = [];
  for(let j = 0; j < data.countries.length; j++) {
    randSeq.push(j);
  };
  randSeq.sort(function(a, b){return 0.5 - Math.random()});
  // Generate Randomized Capitals
  randomizedCapitals = [];
  for(let k = 0; k < data.countries.length; k++) {
    randomizedCapitals.push(data.countries[randSeq[k]]);
  };
};

// Render Capital
function renderCapital (){
  capDisplay.innerHTML = "";
  // Display Current Capital
  if(randomizedCapitals[capitalIndex] != undefined){
    let p = document.createElement("h3");
    p.textContent = randomizedCapitals[capitalIndex].capital;
    p.setAttribute("class", "capitalDisplay");
    p.setAttribute("data-id", randomizedCapitals[capitalIndex].id);
    capDisplay.appendChild(p);
    gameCapID = randomizedCapitals[capitalIndex].id;
  } else {
    gameStarted = false;
    displayButton(true);
    cList.innerHTML = "";
    // Render End Game Screen Here
    gameEnd();
  };
};

// Render Countries
function renderCountries (data){
  // Create List Elements
  for(let i = 0; i < data.countries.length; i++) {
    let li = document.createElement("li");
    li.textContent = data.countries[i].name;
    li.setAttribute("class", "countryButton");
    li.setAttribute("data-id", data.countries[i].id);
    li.onclick = countryClicked;
    cList.appendChild(li);
  };
};

// Cycle Capitals and Score Calculate
function countryClicked() {
  let countryID = parseInt(this.getAttribute("data-id"));

  if(countryID === gameCapID) {
    score += 1;
    console.log(score);
  } else {
    console.log(score);
  };
  
  // Render Capital after score is calculated
  capitalIndex += 1;
  renderCapital();
};

// Game Timer
function gameTimer() {
  let timeInterval = setInterval(function(){
    stopTime += 10;
    if(!gameStarted){
      console.log(stopTime);
      clearInterval(timeInterval);
    };
  },10);
};

// End Screen and Submit Score
function gameEnd() {
  let final = document.createElement("button");
  final.innerHTML = "Submit Score"
  final.setAttribute("type", "button");
  final.onclick = hideOnClick;
  scoreButton.appendChild(final);
  
  displayEndScreen(true);
};

// Hide onClick
function hideOnClick() {
  this.style.setProperty('display', 'none');
  // this.parentElement.innerHTML = "";
};

// ------ Codepen Code based on this HTML ---------------------------------
// `
// <body>
//   <div id="buttonGroup">
//     <button type="button" id="game-7">start</button>
//   </div>
//   <div id="endScreen">
// <!--     <button type="button" id="highscore">Submit Score</button> -->
//   </div>
//   <div class="countries">
//     <h1>Antarctica</h1>
//     <ul id="countryContainer">
//     </ul>
//   </div>
//   <div class="capital">
//     <h3>Capital:</h3>
//     <div id="capitalContainer">
//     </div>
//   </div>
// </body>
// `