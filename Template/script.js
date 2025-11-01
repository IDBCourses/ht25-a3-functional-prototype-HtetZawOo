/*
 * Template from IDB Programming: Code Playground
 * Developed by Htet Zaw Oo for A3:Functional Prototype
 */

import * as Util from "./util.js";


//Global Variables

let players = [];
let nPlayers = 3; //Number of Players
let maxPlayers =3; //Maximum Number of Players
let gameStart = false;
let gameOver = false;
let assignedTapKeys = [
  ["Z","X"], //Player 1 Tap Keys
  ["G","H"], //Player 2 Tap Keys
  ["O","P"], //Player 3 Tap Keys
];
let assignedSwipeKeys =[
  ["Z","X","C","V"], //Player 1 Swipe Keys
  ["G","H","I","J"], //Player 2 Swipe Keys
  ["O","P","[","]"], //Player 3 Swipe Keys
];  


//Global fixed Variables

const initialSize = 50;
const targetSize = 250;
const balloonGap = 200;
const messageBox = document.getElementById("messagebox");
const topBar = document.getElementById("topbar");
//Functions

function showMessageBox (text){ // To call message box.
  messageBox.innerHTML = text;
  messageBox.style.display = "block";
}

function hideMessageBox(){
  messageBox.style.display = "none";
}

function showTopBar (text){
  topBar.innerHTML = text;
  topBar.style.display = "block";
}

function updateTopBar (){
  let text = "";
  for (let i=0; i<nPlayers; i++){
    const tapKeys = players[i].tapKeys;
    const swipeKeys = players[i].swipeKeys;
    text += `${i+1}P - Tap: <b>${tapKeys[0]}</b> & <b>${tapKeys[1]}</b> | Swipe: <b>${swipeKeys[0]}</b> <=> <b>${swipeKeys[3]}</b>`;
    if (i<nPlayers -1) text += `<br>`;
  }
  showTopBar(text);
}
/* //Start Game function
function startGame(){

}

//Game Over function
function gameOver(){

}

//Game Restart function
function restartGame(){

} */

//Create Players and Balloons
function createPlayers(){
players = [];
const balloonGap = window.innerWidth/(nPlayers+1);
console.log(`Players ${players}`);
for (let i=0; i<nPlayers; i++){
  const balloon = Util.createThing("player"+(i+1));
  let hue = (i*120);
  Util.setColour(hue,100,50,1,balloon); 
  console.log(`Hue is ${hue}`);
  Util.setSize(initialSize,initialSize,balloon);
  console.log(i);
  const player = {
    balloon,
    x: balloonGap*(i+1),
    y: window.innerHeight/2,
    tapKeys: assignedTapKeys[i], 
    swipeKeys: assignedSwipeKeys[i],
  };
  console.log(`Ballon is at X-axis: ${player.x}`)
  players.push(player);
  console.log(player);
  Util.setPositionPixels(player.x, player.y,player.balloon);
}
}


//Code that runs over and over again
function loop() {
  
  window.requestAnimationFrame(loop);
}


//Starting Screen of the Game
function startScreen() {
  topBar.style.display = "none";
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
    Player 1 (Red)
    <br>
    Tap: <b>Z</b> & <b>X</b> | Swipe: <b>Z</b> <=> <b>V</b>
    <br>
    Player 2 (Green)
    <br>
    Tap: <b>G</b> & <b>H</b> | Swipe: <b>G</b> <=> <b>K</b>
    <br>
    Player 3 (Blue)
    <br>
    Tap: <b>O</b> & <b>P</b> | Swipe: <b>O</b> <=> <b>]</b>
    </font>
  `);
  //Put your event listener code here
createPlayers();
updateTopBar();
  window.requestAnimationFrame(loop);
}
startScreen(); // Always remember to call setup()!
