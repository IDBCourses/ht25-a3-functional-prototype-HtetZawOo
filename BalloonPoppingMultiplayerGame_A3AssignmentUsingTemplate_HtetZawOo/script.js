/*
 * Template from IDB Programming: Code Playground
 * Developed by Htet Zaw Oo for A3:Functional Prototype
 */

import * as Util from "./util.js";

//State variables are the parts of your program that change over time.
//Global Variables


let players = [];
let nPlayers = 3; //Number of Players
let gameStartBarTimer = 1000;
let winner = null;
//Booleans
let gameStart = false;
let gameOver = false;


//Settings variables should contain all of the "fixed" parts of your programs
//Global fixed Variables


const initialSize = 50;
const targetSize = 250;
const growthRate = 10;
const swipeTime = 100;

//Assigned Keys
const assignedTapKeys = [
  ["z","x"], //Player 1 Tap Keys
  ["g","h"], //Player 2 Tap Keys
  ["o","p"], //Player 3 Tap Keys
];
const assignedSwipeKeys =[
  ["KeyZ","KeyX","KeyC","KeyV"], //Player 1 Swipe Keys
  ["KeyG","KeyH","KeyJ","KeyK"], //Player 2 Swipe Keys
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
  let text = `
  Player 1 | Tap: <b>Z</b> & <b>X</b> | Swipe: <b>Z</b> => <b>V</b>
  <br>
  Player 2 | Tap: <b>G</b> & <b>H</b> | Swipe: <b>G</b> => <b>K</b>
  <br>
  Player 3 | Tap: <b>O</b> & <b>P</b> | Swipe: <b>O</b> => <b>]</b>
  `;
  showTopBar(text);
}

//Start Game function
function startGame(){
  hideMessageBox();
  createPlayers();
  gameStart = true;
  gameOver = false;
  winner = null;
  showTopBar("Game Starts!");
//After 1 second, update top bar
  setTimeout(updateTopBar,gameStartBarTimer);
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
    size: initialSize,
    tapKeys: assignedTapKeys[i], 
    swipeKeys: assignedSwipeKeys[i],
    topBarTap: topBarKeys[i].tap,
    topBarSwipe: topBarKeys[i].swipe,
    swipeProgress: 0,
    lastKey: null,
    startTime: null,
    endTime: null,
    timeoutID: null,
    prevCode: null,
    currCode: null,
    avgSpeed: null,
    popped: false,
    finished: false,
  };

  console.log(`Balloon is at X-axis: ${player.x}`)
  players.push(player);
  console.log(player);
  Util.setPositionPixels(player.x, player.y,player.item);
}
}

//Handling Input
function handlingInputKey (key,code){
  for (let p of players) {
    if (p.popped) continue;  //if popped, terminates current iteration inside loop and starts a new iteration
    //Tap alternatively to Grow
    if (!p.finished) { //if not finished inflating,
      if (p.tapKeys.includes(key)){ // if tapped key includes input key
        if (p.lastKey === null){ //if there is no last key
          p.lastKey = key;
          p.startTime = performance.now(); // save that time as start time
        } else if (p.lastKey !== key){ // if last key is not tapped key
          p.lastKey = key;
          p.presses++; 
          p.size += growthRate;
          Util.setSize(p.size,p.size,p.item);
          //When balloon reaches or exceeds target size,
            if (p.size >= targetSize){
              p.finished = true; //finished inflation phase
              showMessageBox(`<b>Player ${players.indexOf(p)+1}</b>, swipe to pop the balloon!`);
            }
        }
      }
    }
  }
  

  //Swipe Detect (Left to Right)
  for (let p of players){
    if (!p.finished || p.popped) continue; // if not finished inflating or if popped
    if (!p.swipeKeys.includes(code)) continue; // if swipe keys include input key code

    clearTimeout(p.timeoutID);
    p.prevCode = p.currCode;
    p.currCode = code;

    const prevIndex = p.swipeKeys.indexOf(p.prevCode);
    const currIndex = p.swipeKeys.indexOf(p.currCode);

    //Progress only if swiping from Left to Right
    if (prevIndex >=0 && currIndex === prevIndex +1){
      p.swipeProgress++; // if input is adjacent right button of previous input
    } else if (prevIndex === -1 && currIndex === 0) { // if there is no previous input and current input is the start of array index
      p.swipeProgress = 1; //First key of Swipe row
    } else {
      p.swipeProgress = currIndex === 0 ? 1 : 0;//Wrong direction or Key skipped resets progress : if (currIndex === 0){p.swipeProgress = 1} else {p.swipeProgress = 0}
    }

    //If full swipe is executed
    if (p.swipeProgress >= p.swipeKeys.length){ //if player executes successfully of full swipe, 4 keys per player
      p.endTime = performance.now(); //save that time as end time
      const totalTime = ((p.endTime - p.startTime)/1000).toFixed(2);//To show total time elapsed in seconds with 2 decimal places
      Util.setSize(0,0,p.item);
      p.popped = true; // considered as popped
      winner = p; // that player becomes winner
      gameOver = true; // game ends
      hideTopBar();
      showMessageBox(`
        <font size = 6>
        <b>Congratulations!!! Player ${players.indexOf(p)+1}!</b>
        </font>

        <br>
        <br>
        You win the Balloon Game!
        <br>
        Thank you for playing!
        
        <br>
        <br>
        <font size = 4>
        Time Elapsed: <b>${totalTime} seconds</b>
        </font>

        <br>
        <br>
        <font size =1>
        Developed by <b>Htet Zaw Oo</b> for A3: Functional Prototype.
        <br>
        Contact: htetzawoo1995@gmail.com
        </font>
        `);
        break; // terminates current loop
    }
    //Local Event listener for swipe gesture: resetting key presses and swipe progress after taking more than swipeTime after key up for that player
    document.addEventListener("keyup", (event) => {
      p.timeoutID = setTimeout(() => {
      p.prevCode = null; // resets key presses
      p.currCode = null;
      p.swipeProgress = 0; // resets swipe progress
    }, swipeTime);
    }
    )
    
  }  
}
// Starting Screen is run once, at the start of the program. It sets everything up for us!

//Starting Screen of the Game
function startScreen() {
  hideTopBar();
  showMessageBox(`
    <font size = 6>
    <b>Balloon Popping Multiplayer Game!</b>
    </font>

    <br>
    <br>
    <font size = 4>
    Instructions
    </font>
    <br>
    <font size = 2>
    Each player will be assigned with different keys to inflate and pop the balloon.
    <br>
    Player who managed to pop the balloon first wins the game.
    <br>
    <br>
    Step 1: Tap the two assigned keys alternatively to inflate it.
    <br>
    Step 2: Once it is fully inflated, swipe the assigned key row from left to right to pop it.
    </font>

    <br>
    <br>
    <font size = 4>
    Assigned Keys
    </font>
    <br>
    <font size = 2>
    Player 1 (Red) | Tap: <b>Z</b> & <b>X</b> | Swipe: <b>Z</b> => <b>V</b>
    <br>
    Player 2 (Green) | Tap: <b>G</b> & <b>H</b> | Swipe: <b>G</b> => <b>K</b>
    <br>
    Player 3 (Blue) | Tap: <b>O</b> & <b>P</b> | Swipe: <b>O</b> => <b>]</b>
    </font>

    <br>
    <br>
    <font size = 5>
    Press <b>"Enter"</b> to start the game.
    </font>
  `);

// Code that runs over and over again
function loop() {
  

  window.requestAnimationFrame(loop);
}

// Put your event listener code here
//Global Event Listener to handle Inputs

window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  const code = event.code;
  console.log(`Input Key: ${code}`);

  if (!gameStart && !gameOver){
    if (key === "enter"){
      startGame();
      return;
    }
  }
  /* if (gameOver && key === "enter"){
    restartGame();
    return;
  } */
  handlingInputKey(key, code); //Handling the input keys throughout the game
}); 
window.requestAnimationFrame(loop);
}
startScreen(); // Always remember to call startScreen()! (I changed the setup function name to startScreen to make it more realistic with my game)
