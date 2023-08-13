const thisEvent = document.querySelector('#eventInput');
const game = document.querySelector('#gameInput');

// Bracket Location & Best of

const repEvent = nodecg.Replicant('events');

repEvent.on('change', newValue => {
  // The value of the Replicant has changed somewhere in NodeCG,
  // this could be another dashboard panel, a server initiated change,
  // or the doing of another user accessing your dashboard panel.
  thisEvent.value = newValue.eventGame[0];
  game.value = newValue.eventGame[1];
})

// Replicant Changes

const submitButton = document.querySelector('#submitButton');

submitButton.onclick = () => {
  // A Replicant can be modified by modifying its `value`.
  
  // array
  repEvent.value.eventGame = [];
  // fill array
  repEvent.value.eventGame.push(thisEvent.value);
  repEvent.value.eventGame.push(game.value);
  console.log(repEvent.value)
}