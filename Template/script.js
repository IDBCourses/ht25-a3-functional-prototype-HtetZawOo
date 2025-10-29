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
let nPlayers = 0; //Number of Players
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

//Start Game function
function startGame(){

}

//Game Over function
function gameOver(){

}

//Game Restart function
function restartGame(){

}

//Create Players and Balloons
function createPlayers(){
players = [];

for (let i=)
}


//Code that runs over and over again
function loop() {

  window.requestAnimationFrame(loop);
}

//Starting Screen of the Game
function startScreen() {
//Put your event listener code here

  window.requestAnimationFrame(loop);
}

startScreen(); // Always remember to call setup()!
