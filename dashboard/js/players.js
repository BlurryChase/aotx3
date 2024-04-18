// Scoreboard

// Player 1 const
const teams = document.querySelectorAll('.teams');
const tags = document.querySelectorAll('.tags');
const grands = document.querySelectorAll('.grands');
var scores = document.querySelectorAll('.scores');
const ports = document.querySelectorAll('.ports');
const chars = document.querySelectorAll('.chars');


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

  for (let i = 0; i < 4; i++) {
    tags[i].value = newValue.players[i].tag;
    teams[i].value = newValue.players[i].team;
    grands[i].value = newValue.players[i].grandsIndicator;
    scores[i].value = newValue.players[i].score;
    ports[i].value = newValue.players[i].port;
    chars[i].value = newValue.players[i].character;
    console.log(newValue.players[i])
  }
  
  
  
  // p2Tag.value = newValue.players[1].tag;
  // p2Team.value = newValue.players[1].team;
  // p2Grands.value = newValue.players[1].grandsIndicator;
  // p2Score.value = newValue.players[1].score;
  // p2Char.value = newValue.players[1].character;

  bracketLoc.value = newValue.bracketLoc
  bracketLen.value = newValue.bracketLen;

});


// Button Function

// Submit Button
const submitButton = document.querySelector('#submitButton');

submitButton.onclick = () => {
  
  // A Replicant can be modified by modifying its `value`.
  
  matchRep.value.players = []

  for (let i = 0; i < 4; i++) {
    let playerObj = {
      "tag": tags[i].value,
      "team": teams[i].value,
      "score": scores[i].value,
      "grandsIndicator": grands[i].value,
      "port": ports[i].value,
      "character": chars[i].value,
    };
    matchRep.value.players.push(playerObj)
  }

  matchRep.value.bracketLoc = bracketLoc.value
  matchRep.value.bracketLen = bracketLen.value
};

// Swap Button
  function swapNames (vari) {
    
    var swapArray = [];
    
    for (let i = vari; i < vari + 2; i++) {
      
      let swapPlayerObj = {
        "tag": tags[i].value,
        "team": teams[i].value,
        "score": scores[i].value,
        "grandsIndicator": grands[i].value,
        "port": ports[i].value,
        "character": chars[i].value,
      };
      swapArray.push(swapPlayerObj);
    };
  
  
    // swap arrays
    var tmpArray = swapArray[0];
    swapArray[0] = swapArray[1];
    swapArray[1] = tmpArray;
  
    for (let x = 0; x < 2; x++) {
      tags[x + vari].value = swapArray[x].tag;
      teams[x + vari].value = swapArray[x].team;
      scores[x + vari].value = swapArray[x].score;
      grands[x + vari].value = swapArray[x].grandsIndicator;
      ports[x + vari].value = swapArray[x].port;
      chars[x + vari].value = swapArray[x].character
      
    };
};

const clearButton = document.querySelector('#clearButton');

clearButton.onclick = () => {

  for (let i = 0; i < 4; i++) {
    tags[i].value = "";
    teams[i].value = "";
    grands[i].value = "";
    scores[i].value = 0;
    ports[i].value = "";
    chars[i].value = "";
  }


  // document.getElementById('player1Tag').value = "";
  // document.getElementById('player1Team').value = "";
  // document.getElementById('player1Grands').value = "";
  // document.getElementById('player1Score').value = 0;
  
  // // Player 2   
  // document.getElementById('player2Tag').value = "";
  // document.getElementById('player2Team').value = "";
  // document.getElementById('player2Grands').value = "";
  // document.getElementById('player2Score').value = 0;
}
