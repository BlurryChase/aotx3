const l3rdsTop = document.querySelector('#l3rdsTop');
const l3rdsBottom = document.querySelector('#l3rdsBottom');

const panelTop = document.querySelector('#panelTop');
const panelBottom = document.querySelector('#panelBottom');
const panelTimer = document.querySelector('#panelTimer');


// Bracket Location & Best of

const infoRep = nodecg.Replicant('misc');

infoRep.on('change', newValue => {
  // The value of the Replicant has changed somewhere in NodeCG,
  // this could be another dashboard panel, a server initiated change,
  // or the doing of another user accessing your dashboard panel.
  l3rdsTop.value = newValue.l3rdTop;
  l3rdsBottom.value = newValue.l3rdBottom;

  panelTop.value = newValue.brbTop;
  panelBottom.value = newValue.brbBottom;
  panelTimer.value = newValue.brbTimer;

})

// Replicant Changes

const submitButton = document.querySelector('#submitButton');

submitButton.onclick = () => {
  // A Replicant can be modified by modifying its `value`.
  
  // l3rds
  infoRep.value.l3rdTop = l3rdsTop.value;
  infoRep.value.l3rdBottom = l3rdsBottom.value;

  // fill array
  infoRep.value.brbTop = panelTop.value;
  infoRep.value.brbBottom = panelBottom.value;
  infoRep.value.brbTimer = String(panelTimer.value);
  
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