/*
 * Template from IDB Programming: Code Playground
 * Developed by Htet Zaw Oo for A3:Functional Prototype
 */

import * as Util from "./util.js";


//Global Variables


let players = [];
let nPlayers = 3; //Number of Players
let gameStartBarTimer = 1000;
let winner = null;
//Booleans
let gameStart = false;
let gameOver = false;


//Global fixed Variables


const initialSize = 50;
const targetSize = 250;
const growthRate = 10;

//Assigned Keys
const assignedTapKeys = [
  ["z","x"], //Player 1 Tap Keys
  ["g","h"], //Player 2 Tap Keys
  ["o","p"], //Player 3 Tap Keys
];
const assignedSwipeKeys =[
  ["KeyZ","KeyX","KeyC","KeyV"], //Player 1 Swipe Keys
  ["KeyG","KeyH","KeyI","KeyJ"], //Player 2 Swipe Keys
  ["KeyO","KeyP","BracketLeft","BracketRight"], //Player 3 Swipe Keys
];
const topBarKeys = [
  {tap: ["Z","X"], swipe: ["Z","V"]}, //Player 1 Top Bar
  {tap: ["G","H"], swipe: ["G","K"]}, //Player 2 Top Bar
  {tap: ["O","P"], swipe: ["O","]"]}, //Player 3 Top Bar
]; 


//Retrieving elements from HTML with ID
const messageBox = document.getElementById("messagebox");
const topBar = document.getElementById("topbar");


//Functions


function showMessageBox (text){ // To call message box
  messageBox.innerHTML = text;
  messageBox.style.display = "block";
  messageBox.style.zIndex = 3; // To make messageBox appear on top of everything
}

function hideMessageBox(){
  messageBox.style.display = "none";
}

function showTopBar (text){
  topBar.innerHTML = text;
  topBar.style.display = "block";
  messageBox.style.zIndex = 2;
}

function hideTopBar(){
  topBar.style.display = "none";
}

function clearTopBarData(){
  topBar.innerHTML = "";
}

function updateTopBar (){
  let text = "";
  for (let i=0; i<nPlayers; i++){
    const tapKeys = players[i].topBarTap;
    const swipeKeys = players[i].topBarSwipe;
    text += `${i+1}P - Tap: <b>${tapKeys[0]}</b> & <b>${tapKeys[1]}</b> | Swipe: <b>${swipeKeys[0]}</b> <=> <b>${swipeKeys[1]}</b><br>`;
    /* if (i<nPlayers -1) text += `<br>`; */
  }
  showTopBar(text);
}

//Start Game function
function startGame(){
  hideMessageBox();
  createPlayers();
  gameStart = true;
  gameOver = false;
  showTopBar("Game Starts!");
//After 1 second, update top bar
  setTimeout(updateTopBar,gameStartBarTimer);
}

//Game Restart function
function restartGame(){
  hideMessageBox();
  clearTopBarData();
  players=[];
  gameStart = false;
  gameOver = false;
  startScreen();
}

//Create Players and Balloons
function createPlayers(){
players = [];
const balloonGap = window.innerWidth/(nPlayers+1);

for (let i=0; i<nPlayers; i++){
  const balloon = Util.createThing("player"+(i+1));
  let hue = (i*120);
  Util.setColour(hue,100,50,0.7,balloon); 
  console.log(`Hue is ${hue}`);
  Util.setSize(initialSize,initialSize,balloon);

  console.log(`Elements inside players array: ${players}`);
  console.log(`PlayersIndex ${i}`);

  const player = {
    item: balloon,
    x: balloonGap*(i+1),
    y: window.innerHeight/2,
    tapKeys: assignedTapKeys[i], 
    swipeKeys: assignedSwipeKeys[i],
    topBarTap: topBarKeys[i].tap,
    topBarSwipe: topBarKeys[i].swipe,
  };

  console.log(`Balloon is at X-axis: ${player.x}`)
  players.push(player);
  console.log(player);
  Util.setPositionPixels(player.x, player.y,player.item);
}
}


//Code that runs over and over again
function loop() {
  
  window.requestAnimationFrame(loop);
}


//Starting Screen of the Game
function startScreen() {
  hideTopBar();
  showMessageBox(`
    <font size = 6>
    <b>Balloon Popping Race!</b>
    </font>

    <br>
    <br>
    Please choose number of players.
    <br>
    Please press <b>2</b> or <b>3</b> on the keyboard.
    <br>
    <br>

    <font size = 2>
    Instructions: Each player will be assigned with different keys to inflate and pop the balloon.
    <br>
    Step 1: Tap the two assigned keys alternatively to inflate it.
    <br>
    Step 2: Once it is fully inflated, swipe the assigned key row from any direction to pop it.
    </font>

    <br>
    <br>
    Assigned Keys

    <br>
    <br>
    <font size = 2>
    Player 1 (Red) | Tap: <b>Z</b> & <b>X</b> | Swipe: <b>Z</b> <=> <b>V</b>
    <br>
    Player 2 (Green) | Tap: <b>G</b> & <b>H</b> | Swipe: <b>G</b> <=> <b>K</b>
    <br>
    Player 3 (Blue) | Tap: <b>O</b> & <b>P</b> | Swipe: <b>O</b> <=> <b>]</b>
    </font>
  `);
  //Put your event listener code here

document.addEventListener("keydown", (event) => {
  if (event.code === "Enter"){
    startGame();
    console.log(players);
  }
});
document.addEventListener("keydown", (event)=>{
  if (event.code === "Space"){
    restartGame();
    console.log(players);
  }
});
  window.requestAnimationFrame(loop);
}
startScreen(); // Always remember to call setup()!
