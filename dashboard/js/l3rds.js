const l3rdsTop = document.querySelector('#l3rdsTop');
const l3rdsBottom = document.querySelector('#l3rdsBottom');

const panelTop = document.querySelector('#panelTop');
const panelBottom = document.querySelector('#panelBottom');

// Bracket Location & Best of

const infoRep = nodecg.Replicant('misc');

infoRep.on('change', newValue => {
  // The value of the Replicant has changed somewhere in NodeCG,
  // this could be another dashboard panel, a server initiated change,
  // or the doing of another user accessing your dashboard panel.
  l3rdsTop.value = newValue.l3rdInfo[0];
  l3rdsBottom.value = newValue.l3rdInfo[1];

  panelTop.value = newValue.brbPanel[0];
  panelBottom.value = newValue.brbPanel[1];
})

// Replicant Changes

const submitButton = document.querySelector('#submitButton');

submitButton.onclick = () => {
  // A Replicant can be modified by modifying its `value`.
  
  // l3rds
  infoRep.value.l3rdInfo = [];
  // fill array
  infoRep.value.l3rdInfo.push(l3rdsTop.value);
  infoRep.value.l3rdInfo.push(l3rdsBottom.value);

  infoRep.value.brbPanel = [];
  // fill array
  infoRep.value.brbPanel.push(panelTop.value);
  infoRep.value.brbPanel.push(panelBottom.value);
}

const clearL3rdButton = document.querySelector('#clearL3rdButton');

clearL3rdButton.onclick = () => {
  document.getElementById('l3rdsTop').value = "";
  document.getElementById('l3rdsBottom').value ="";
}

const clearBRBButton = document.querySelector('#clearBRBButton');

clearBRBButton.onclick = () => {

  document.getElementById('panelTop').value = "";
  document.getElementById('panelBottom').value = "";

}