/*
 * Template from IDB Programming: Code Playground
 * Developed by Htet Zaw Oo for A3:Functional Prototype
 */

import * as Util from "./util.js";


//Global Variables

let players = [];
let nPlayers = 3; //Number of Players
let maxPlayers =4; //Maximum Number of Players
let gameStart = false;
let gameOver = false;
let assignedKeys = [
  ["z","x"], //Player 1 Keys
  ["g","h"], //Player 2 Keys
  ["o","p"], //Player 3 Keys
];

//Global fixed Variables

const initialSize = 50;
const targetSize = 250;
const balloonGap = 200;

//Functions

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
  Util.setColour(hue,100,50,1,balloon); //Need to have no identical colors
  console.log(`Hue is ${hue}`);
  Util.setSize(initialSize,initialSize,balloon);
  console.log(i);
  const player = {
    balloon,
    x: balloonGap*(i+1),
    y: window.innerHeight/2,
  };
  
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
//Put your event listener code here
createPlayers();

  window.requestAnimationFrame(loop);
}

startScreen(); // Always remember to call setup()!
