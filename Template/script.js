/*
 * Template from IDB Programming: Code Playground
 * Developed by Htet Zaw Oo for A3:Functional Prototype
 */

import * as Util from "./util.js";

//Global Constants
const initialSize = 50;
const targetSize = 250;
const balloonGap = 200;

//Global Variables
let players = []
let nPlayers = 4; //Number of Players
let maxPlayers =4; //Maximum Number of Players
let gameStart = false;
let gameOver = false;
let assignedKeys = [
  ["q","w"], //Player 1 Keys
  ["o","p"], //Player 2 Keys
  ["c","v"], //Player 3 Keys
  ["n","m"]  //Player 4 Keys
];

//Settings variables should contain all of the "fixed" parts of your programs

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
  Util.setColour(Math.random()*360,100,50,1,balloon); //Need to have no identical colors
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
