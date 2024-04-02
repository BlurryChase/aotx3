// Graphics Control

// declare replicants

var matchRep = nodecg.Replicant('match');
var commRep = nodecg.Replicant('comm');
var lowerRep = nodecg.Replicant('misc');

// declare queryselectors


var singlesVisibleBTN = document.querySelector('#singlesVisibleButton');
var commentaryVisibleBTN = document.querySelector('#commentaryVisibleButton');
var lowerThirdsVisibleBTN = document.querySelector('#lowerThirdsVisibleButton');



// declare on.change

matchRep.on('change', newValue => {

  if (newValue.isVisible === false) {
    singlesVisibleBTN.innerHTML = 'NOT VISIBLE';
  } else {
    singlesVisibleBTN.innerHTML = 'VISIBLE';
  }

});

commRep.on('change', newValue => {

  if (newValue.isVisible === false) {
    commentaryVisibleBTN.innerHTML = 'NOT VISIBLE';
  } else {
    commentaryVisibleBTN.innerHTML = 'VISIBLE';
  }
});

lowerRep.on('change', newValue => {

  if (newValue.isVisible === false) {
    lowerThirdsVisibleBTN.innerHTML = 'NOT VISIBLE';
  } else {
    lowerThirdsVisibleBTN.innerHTML = 'VISIBLE';
  }
});

// declare button logic

singlesVisibleBTN.onclick = () => {
  if (matchRep.value.isVisible != true) {
    matchRep.value.isVisible = true;
  } else {
    matchRep.value.isVisible = false;
  }
  console.log("Singles: " + matchRep.value.isVisible);
};

commentaryVisibleBTN.onclick = () => {
  if (commRep.value.isVisible != true) {
    commRep.value.isVisible = true;
  } else {
    commRep.value.isVisible = false;
  }
  console.log("Commentary: " + commRep.value.isVisible);
};

lowerThirdsVisibleBTN.onclick = () => {
  if (lowerRep.value.isVisible != true) {
    lowerRep.value.isVisible = true;
  } else {
    lowerRep.value.isVisible = false;
  }
  console.log("Lower Thirds: " + lowerRep.value.isVisible);
};