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
    thisEvent = eventRep.value.eventGame[0];
    console.log(thisEvent)
    thisGame = eventRep.value.eventGame[1];
    console.log(thisGame)
    
    
    link.href = `assets/${thisEvent}/score_${thisGame}_main.css`;
    
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

    p1Move = params[thisEvent]["p1Move"]; // px move for p1
    p2Move = params[thisEvent]["p2Move"]; // px move for p2
    
    rdSize = params[thisEvent]["rdSize"]; // round size
    rdTime = params[thisEvent]["rdTime"]; // round time
    
    scTime = params[thisEvent]["scTime"]; // score timer
    scDelay = params[thisEvent]["scDelay"]; // delay for score timer
    
    bgVid.play()
    
    console.log(images);
    
})


eventRep.on('change', (newValue, oldValue) => { 

    if (newValue.eventGame[0] != oldValue.eventGame[0] || newValue.eventGame[1] != oldValue.eventGame[1]) {
        location.reload()
        startup = true;
    }

});