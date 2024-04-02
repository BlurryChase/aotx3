const thisEvent = document.querySelector('#eventInput');
const game = document.querySelector('#gameInput');

// Bracket Location & Best of

const eventRep = nodecg.Replicant('events');

eventRep.on('change', newValue => {
  // The value of the Replicant has changed somewhere in NodeCG,
  // this could be another dashboard panel, a server initiated change,
  // or the doing of another user accessing your dashboard panel.
  thisEvent.value = newValue.event;
  game.value = newValue.game;
})

// Replicant Changes

const submitButton = document.querySelector('#submitButton');

submitButton.onclick = () => {
  // A Replicant can be modified by modifying its `value`.
  
  
  eventRep.value.event = thisEvent.value;
  eventRep.value.game = game.value;
}