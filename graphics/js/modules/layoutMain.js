var thisEvent;
var thisGame;

var startup = true;
var isVisible = false;

var nameSize = 40;
var p1Move = '-60px';
var p2Move = '60px';
var nameTime = 0.3;

var rdSize = 17;
var rdTime = 0.2;

var scTime = 0.3;
var scDelay = 0;

const eventRep = nodecg.Replicant('events') 
// create the link for the html page
let head = document.getElementsByTagName('HEAD')[0];

let link = document.createElement('link');

link.rel = 'stylesheet';

link.type = 'text/css';


NodeCG.waitForReplicants(eventRep).then(() => {
    // load replicants
    thisEvent = eventRep.value.event;
    console.log(thisEvent)
    thisGame = eventRep.value.game;
    console.log(thisGame)
    
    
    link.href = `assets/${thisEvent}/score_${thisGame}.css`;
    
    head.appendChild(link);
    
    let suplexOverlay = document.querySelector("#suplexOverlay")
    let suplexHTML = ''
    if (thisGame === 'SF6' || thisGame === 'GGST' ) {
        suplexOverlay.innerHTML = '';
        suplexHTML +=
        `<video loop preload mute id="suplexVideo">
        <source src="assets/${thisEvent}/img/${thisGame}.webm" type="video/webm">
        </video>`;
        suplexOverlay.innerHTML = suplexHTML;
        var bgVid = document.getElementById("suplexVideo");
        console.log(bgVid)
        
    }
    
    
    nameSize = params[thisEvent]["nameSize"]; // name size
    nameTime = params[thisEvent]["nameTime"]; // name time

    nameMove = params[thisEvent]["nameMove"]; // px move for players
    
    rdSize = params[thisEvent]["rdSize"]; // round size
    rdTime = params[thisEvent]["rdTime"]; // round time
    
    scTime = params[thisEvent]["scTime"]; // score timer
    scDelay = params[thisEvent]["scDelay"]; // delay for score timer
    
    bgVid.play()
    
    console.log(images);
    
})


eventRep.on('change', (newValue, oldValue) => { 

    if (newValue.event != oldValue.event || newValue.game != oldValue.game) {
        location.reload()
        startup = true;
    }

});