const matchRep = nodecg.Replicant('match');


NodeCG.waitForReplicants(matchRep).then(() => {
  console.log('match reps loaded');
})


let testFunc = function(i) {

  // const matchRep = nodecg.Replicant('match');
  // var l3rdsRep = nodecg.Replicant('misc');
  
  matchRep.value.player1Info = [];
  // fill array
  matchRep.value.player1Info.push(document.querySelectorAll("#queueP1Tag")[i].value);
  matchRep.value.player1Info.push(document.querySelectorAll("#queueP1Team")[i].value);
  // player 2 info
  matchRep.value.player2Info = [];
  // fill array
  matchRep.value.player2Info.push(document.querySelectorAll("#queueP2Tag")[i].value);
  matchRep.value.player2Info.push(document.querySelectorAll("#queueP2Team")[i].value);
  // push score
  matchRep.value.playerScore = [];
  // fill array
  matchRep.value.playerScore.push(0);
  matchRep.value.playerScore.push(0);
  // bracket info
  matchRep.value.bracketInfo = [];
  // fill array
  matchRep.value.bracketInfo.push(document.querySelectorAll("#queueBracketLoc")[i].value);
  matchRep.value.bracketInfo.push(document.querySelectorAll("#queueBracketLen")[i].value);


  // l3rds
  // l3rdsRep.value.l3rdInfo = [];
  // fill array
  l3rdsRep.value.l3rdInfo[0] = document.querySelectorAll("#queueBracketPhase")[i].value;
  let hideHTML = document.getElementById(i);
  hideHTML.style.display = 'none';




}


const queuePullBTN = document.querySelector('#queuePullBTN');
      
queuePullBTN.onclick = () => {
  startGGPull();
};
