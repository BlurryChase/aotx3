// Scoreboard

// Player 1 const
const p1Team = document.querySelector('#player1Team');
const p1Tag = document.querySelector('#player1Tag');
const p1Grands = document.querySelector('#player1Grands');
var p1Score = document.querySelector('#player1Score');


// Player 2 const
const p2Team = document.querySelector('#player2Team');
const p2Tag = document.querySelector('#player2Tag');
const p2Grands = document.querySelector('#player2Grands');
var p2Score = document.querySelector('#player2Score');

const p1Char = document.querySelector('#leftChar');
const p2Char = document.querySelector('#rightChar');


// Bracket Location & Length
const bracketLoc = document.querySelector('#bracketLoc');
const bracketLen = document.querySelector('#bracketLen');

// dummy const to swap player 1 & 2
// Doubles isn't a priority due to never running it, will add full-team swapping later

// Replicants

const matchRep = nodecg.Replicant('match');


// proper on.changes

matchRep.on('change', newValue => {
  // The value of the Replicant has changed somewhere in NodeCG,
  // this could be another dashboard panel, a server initiated change,
  // or the doing of another user accessing your dashboard panel.


  p1Tag.value = newValue.players[0].tag;
  p1Team.value = newValue.players[0].team;
  p1Grands.value = newValue.players[0].grandsIndicator;
  p1Score.value = newValue.players[0].score;
  p1Char.value = newValue.players[0].character;
  
  p2Tag.value = newValue.players[1].tag;
  p2Team.value = newValue.players[1].team;
  p2Grands.value = newValue.players[1].grandsIndicator;
  p2Score.value = newValue.players[1].score;
  p2Char.value = newValue.players[1].character;

  bracketLoc.value = newValue.bracketLoc
  bracketLen.value = newValue.bracketLen;

});


// Button Function

// Submit Button
const submitButton = document.querySelector('#submitButton');

submitButton.onclick = () => {
  
  // A Replicant can be modified by modifying its `value`.
  
  matchRep.value.players = []

  let p1Obj = {
    "tag": p1Tag.value,
    "team": p1Team.value,
    "score": p1Score.value,
    "grandsIndicator": p1Grands.value,
    "character": p1Char.value,
  }

  let p2Obj = {
    "tag": p2Tag.value,
    "team": p2Team.value,
    "score": p2Score.value,
    "grandsIndicator": p2Grands.value,
    "character": p2Char.value,
  }

  matchRep.value.players.push(p1Obj)
  matchRep.value.players.push(p2Obj)

  console.log(matchRep.value.players[0].tag)

  matchRep.value.bracketLoc = bracketLoc.value
  matchRep.value.bracketLen = bracketLen.value
};

// Swap Button
const swapButton = document.querySelector('#swapButton');

swapButton.onclick = () => {

  var p1Array = [];
  var p2Array = [];

  // fill arrays
  p1Array.push(p1Tag.value);
  p1Array.push(p1Team.value);
  p1Array.push(p1Grands.value);
  p1Array.push(Number(p1Score.value));
  p1Array.push(p1Char.value)

  // fill array
  p2Array.push(p2Tag.value);
  p2Array.push(p2Team.value);
  p2Array.push(p2Grands.value);
  p2Array.push(Number(p2Score.value));
  p2Array.push(p2Char.value)


  // swap arrays
  var tmpArray = p1Array;
  p1Array = p2Array;
  p2Array = tmpArray;


  document.getElementById('player1Tag').value = p1Array[0];
  document.getElementById('player1Team').value = p1Array[1];
  document.getElementById('player1Grands').value = p1Array[2];
  document.getElementById('player1Score').value = p1Array[3];
  document.getElementById('leftChar').value = p1Array[4];
  
  // Player 2   
  document.getElementById('player2Tag').value = p2Array[0];
  document.getElementById('player2Team').value = p2Array[1];
  document.getElementById('player2Grands').value = p2Array[2];
  document.getElementById('player2Score').value = p2Array[3];
  document.getElementById('rightChar').value = p2Array[4];


}

const clearButton = document.querySelector('#clearButton');

clearButton.onclick = () => {
  document.getElementById('player1Tag').value = "";
  document.getElementById('player1Team').value = "";
  document.getElementById('player1Grands').value = "";
  document.getElementById('player1Score').value = 0;
  
  // Player 2   
  document.getElementById('player2Tag').value = "";
  document.getElementById('player2Team').value = "";
  document.getElementById('player2Grands').value = "";
  document.getElementById('player2Score').value = 0;
}
