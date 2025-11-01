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
let assignedKeys = [
  ["z","x"], //Player 1 Keys
  ["g","h"], //Player 2 Keys
  ["o","p"], //Player 3 Keys
];

//Global fixed Variables

const initialSize = 50;
const targetSize = 250;
const balloonGap = 200;
const messagebox = document.getElementById("messagebox");

//Functions
function showMessageBox (text){
  messagebox.innerHTML = text;
  messagebox.style.display = "block";
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
  showMessageBox(`
    <b>Balloon Popping Race!</b>
    <br>
    <br>
    Please choose number of players (2 or 3):
    <br>
    Please press 2 or 3 on the keyboard.
    <br>
    <br>
    Instructions: Each player will be assigned with different keys to inflate and pop the balloon.
    <br>
    Player 1 (Red)  
    `)
  //Put your event listener code here
createPlayers();

  window.requestAnimationFrame(loop);
}

startScreen(); // Always remember to call setup()!
