// COMMENTARY

// Commentary 1 const
const c1Team = document.querySelector('#c1Team');
const c1Tag = document.querySelector('#c1Tag');
const c1Twitter = document.querySelector('#c1Twitter');

// Commentary 2 const
const c2Team = document.querySelector('#c2Team');
const c2Tag = document.querySelector('#c2Tag');
const c2Twitter = document.querySelector('#c2Twitter');


// Rep func

const commRep = nodecg.Replicant('comm');

commRep.on('change', newValue => {
  // The value of the Replicant has changed somewhere in NodeCG,
  // this could be another dashboard panel, a server initiated change,
  // or the doing of another user accessing your dashboard panel.
  c1Tag.value = newValue.comm1Info[0];
  c1Team.value = newValue.comm1Info[1];
  c1Twitter.value = newValue.comm1Info[2];

  c2Tag.value = newValue.comm2Info[0];
  c2Team.value = newValue.comm2Info[1];
  c2Twitter.value = newValue.comm2Info[2];

});

// Button Function
const submitButton = document.querySelector('#submitButton');

submitButton.onclick = () => {
  // A Replicant can be modified by modifying its `value`.
  // Centary

  // comm 1 info
  commRep.value.comm1Info = [];
  // fill array
  commRep.value.comm1Info.push(c1Tag.value);
  commRep.value.comm1Info.push(c1Team.value);
  commRep.value.comm1Info.push(c1Twitter.value);
  // comm 2 info
  commRep.value.comm2Info = [];
  // fill array
  commRep.value.comm2Info.push(c2Tag.value);
  commRep.value.comm2Info.push(c2Team.value);
  commRep.value.comm2Info.push(c2Twitter.value);

  console.log(commRep)
  
};

// Swap Button
const swapButton = document.querySelector('#swapButton');

swapButton.onclick = () => {

  var c1Array = [];
  var c2Array = [];

  // fill arrays
  c1Array.push(c1Tag.value);
  c1Array.push(c1Team.value);
  c1Array.push(c1Twitter.value);

  // fill array
  c2Array.push(c2Tag.value);
  c2Array.push(c2Team.value);
  c2Array.push(c2Twitter.value);

  // swap arrays
  var tmpArray = c1Array;
  c1Array = c2Array;
  c2Array = tmpArray;


  document.getElementById('c1Tag').value = c1Array[0];
  document.getElementById('c1Team').value = c1Array[1];
  document.getElementById('c1Twitter').value = c1Array[2];
  
  // c 2   
  document.getElementById('c2Tag').value = c2Array[0];
  document.getElementById('c2Team').value = c2Array[1];
  document.getElementById('c2Twitter').value = c2Array[2];

}

const clearButton = document.querySelector('#clearButton');

clearButton.onclick = () => {
  document.getElementById('c1Tag').value = "";
  document.getElementById('c1Team').value = "";
  document.getElementById('c1Twitter').value = "";
  
  // c 2   
  document.getElementById('c2Tag').value = "";
  document.getElementById('c2Team').value = "";
  document.getElementById('c2Twitter').value = "";
}