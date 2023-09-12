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

const leftChar = document.querySelector('#leftChar');
const rightChar = document.querySelector('#rightChar');


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
  p1Tag.value = newValue.player1Info[0];
  p1Team.value = newValue.player1Info[1];
  
  p2Tag.value = newValue.player2Info[0];
  p2Team.value = newValue.player2Info[1];
  
  p1Grands.value = newValue.playerGrands[0];
  p2Grands.value = newValue.playerGrands[1];
  
  p1Score.value = newValue.playerScore[0];
  p2Score.value = newValue.playerScore[1];

  bracketLoc.value = newValue.bracketInfo[0];
  bracketLen.value = newValue.bracketInfo[1];

  leftChar.value = newValue.playerCharacters[0];
  rightChar.value = newValue.playerCharacters[1];
});


// Button Function

// Submit Button
const submitButton = document.querySelector('#submitButton');

submitButton.onclick = () => {
  // A Replicant can be modified by modifying its `value`.
  // player 1 info
  matchRep.value.player1Info = [];

  // fill array
  matchRep.value.player1Info.push(p1Tag.value);
  matchRep.value.player1Info.push(p1Team.value);
  console.log(matchRep.value.player1Info);
  // player 2 info
  matchRep.value.player2Info = [];
  // fill array
  matchRep.value.player2Info.push(p2Tag.value);
  matchRep.value.player2Info.push(p2Team.value);
  // player grands info
  matchRep.value.playerGrands = [];
  // fill array
  matchRep.value.playerGrands.push(p1Grands.value);
  matchRep.value.playerGrands.push(p2Grands.value);
  // player 2 info
  matchRep.value.playerScore = [];
  // fill array
  matchRep.value.playerScore.push(Number(p1Score.value));
  matchRep.value.playerScore.push(Number(p2Score.value));
  // player character info
  matchRep.value.playerCharacters = [];
  // fill array
  matchRep.value.playerCharacters.push(leftChar.value);
  matchRep.value.playerCharacters.push(rightChar.value);
  // match info
  matchRep.value.bracketInfo = [];
  // fill array
  matchRep.value.bracketInfo.push(bracketLoc.value);
  matchRep.value.bracketInfo.push(bracketLen.value);
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
  p1Array.push(leftChar.value)

  // fill array
  p2Array.push(p2Tag.value);
  p2Array.push(p2Team.value);
  p2Array.push(p2Grands.value);
  p2Array.push(Number(p2Score.value));
  p2Array.push(rightChar.value)


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
  document.getElementById('player1Score').value = "";
  
  // Player 2   
  document.getElementById('player2Tag').value = "";
  document.getElementById('player2Team').value = "";
  document.getElementById('player2Grands').value = "";
  document.getElementById('player2Score').value = "";
}

