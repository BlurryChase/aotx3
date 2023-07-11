const l3rdsTop = document.querySelector('#l3rdsTop');
const l3rdsBottom = document.querySelector('#l3rdsBottom');

// Bracket Location & Best of

const l3rdsRep = nodecg.Replicant('misc');

l3rdsRep.on('change', newValue => {
  // The value of the Replicant has changed somewhere in NodeCG,
  // this could be another dashboard panel, a server initiated change,
  // or the doing of another user accessing your dashboard panel.
  l3rdsTop.value = newValue.l3rdInfo[0];
  l3rdsBottom.value = newValue.l3rdInfo[1];
})

// Replicant Changes

const submitButton = document.querySelector('#submitButton');

submitButton.onclick = () => {
  // A Replicant can be modified by modifying its `value`.
  
  // l3rds
  l3rdsRep.value.l3rdInfo = [];
  // fill array
  l3rdsRep.value.l3rdInfo.push(l3rdsTop.value);
  l3rdsRep.value.l3rdInfo.push(l3rdsBottom.value);
}

const clearButton = document.querySelector('#clearButton');

clearButton.onclick = () => {
  document.getElementById('l3rdsTop').value = "";
}