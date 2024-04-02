
// Commentary 1 const
const c1Team = document.querySelector('#c1Team');
const c1Tag = document.querySelector('#c1Tag');
const c1Twitter = document.querySelector('#c1Twitter');

// Commentary 2 const
const c2Team = document.querySelector('#c2Team');
const c2Tag = document.querySelector('#c2Tag');
const c2Twitter = document.querySelector('#c2Twitter');


var datalistTags = document.querySelector('#csvPlayerTags');
var datalistTeams = document.querySelector('#csvPlayerTeams');
var datalistTwitters = document.querySelector('#csvPlayerTwitters');

var tagList = '';
var teamList = '';
var twitterList = '';


var data;

Papa.parse('csv/filtered.csv', {
  download: true,
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  complete: function(results) {
    data = results.data;
    console.log(data.length);
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      tagList += `<option>${data[i]["GamerTag"]}</option>`;
      teamList += `<option>${data[i]["Sponsor"]}</option>`;
      twitterList += `<option>${data[i]["Twitter"]}</option>`;


    }
    datalistTags.innerHTML = tagList;
    datalistTeams.innerHTML = teamList;
    datalistTwitters.innerHTML = twitterList;

  }
});

// Rep func

const commRep = nodecg.Replicant('comm');

commRep.on('change', newValue => {
  // The value of the Replicant has changed somewhere in NodeCG,
  // this could be another dashboard panel, a server initiated change,
  // or the doing of another user accessing your dashboard panel.
  c1Tag.value = newValue.caster[0].name;
  c1Team.value = newValue.caster[0].team;
  c1Twitter.value = newValue.caster[0].twitter;
  
  c2Tag.value = newValue.caster[1].name;
  c2Team.value = newValue.caster[1].team;
  c2Twitter.value = newValue.caster[1].twitter;
  
});

// Button Function
const submitButton = document.querySelector('#submitButton');

submitButton.onclick = () => {
  // A Replicant can be modified by modifying its `value`.
  // Centary
  
  commRep.value.caster = []

  let comm1Obj = {
    "name": c1Tag.value,
    "team": c1Team.value,
    "twitter": c1Twitter.value,
  }

  let comm2Obj = {
    "name": c2Tag.value,
    "team": c2Team.value,
    "twitter": c2Twitter.value,
  }

  commRep.value.caster.push(comm1Obj)
  commRep.value.caster.push(comm2Obj)
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

