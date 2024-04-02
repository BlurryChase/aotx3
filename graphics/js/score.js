window.onload = init;

var params = {}
fetch("js/params.json")
	.then((res) => res.json())
	.then((data) => {
		params = data;
		console.log(data);
	})

function init(){

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


	let sideVal = ['LeftSide', 'RightSide']
	// create the link for the html page
	
	function scoreboard() {
		if (startup == true) {
			getData();
			startup = false;
			animated = true;
		}
		else {
			getData();
		}
	}
	
	setTimeout(scoreboard, 300); // runs it if parseJSON doesn't, aka animates it in
	
	
	function getData() {
		// We can access Replicants from other bundles by specifying the bundle name as a second parameter.
		// NodeCG requires that bundle names match their directory names, but you can always check the `package.json` to double check.
		
		const matchRep = nodecg.Replicant('match')

		function grandsStuff (vari) {

				let p1G = vari.players[0].grandsIndicator;
				let p2G = vari.players[1].grandsIndicator;

				p1G = p1G.toLowerCase();
				p2G = p2G.toLowerCase();

				let winners;
				let losers;


				console.log(eventRep.value.game);
				if (eventRep.value.game === 'GGST' || eventRep.value.game === 'SF6') {
					winners = 'W';
					losers = 'L';
				} else {
					winners = 'Winners';
					losers = 'Losers';
				}

				
				gsap.to("#grandsBG", { duration: scTime, opacity: 1, delay: scDelay});
				switch (true) {
					case (p1G === 'w' && p2G === 'l'):
						console.log(p1G)
						p1Grands.innerHTML = winners;
						p2Grands.innerHTML = losers;
						break;
					case (p1G === 'l' && p2G === 'w'):
						console.log(p2G)
						p1Grands.innerHTML = losers;
						p2Grands.innerHTML = winners;
						break;
					case (p1G === 'w' && p2G === 'w') || (p1G === 'l'&& p2G === 'l'):	
						p1Grands.innerHTML = losers;
						p2Grands.innerHTML = losers;
						break;
					default:
						gsap.to("#grandsBG", { duration: scTime, opacity: 0, delay: scDelay});
					};

			
		}

		function updateInfo ( doodle ) {

			for ( let i = 0; i < 2; i++ ) {

				document.querySelectorAll(".names")[i].innerHTML = doodle.players[i].tag;

				if (eventRep.value.game == 'SUPLEX') {
					if (doodle.players[i].team === "") {
						document.querySelectorAll(".teams")[i].innerHTML = doodle.players[i].team;
					} else {
						document.querySelectorAll(".teams")[i].innerHTML = doodle.players[i].team + ' |';
					}
				} else {
					document.querySelectorAll(".teams")[i].innerHTML = doodle.players[i].team;
				}

				textFit(document.querySelectorAll('.wrappers')[i], { maxFontSize: nameSize, alignVert: true });

				
				document.querySelectorAll(".scores")[i].innerHTML = doodle.players[i].score;

				document.querySelectorAll(".characters")[i].setAttribute("src", `assets/MNM/img/chars/${sideVal[i]}/${doodle.players[i].character.toLowerCase()}.png`);

				bracketLoc.innerHTML = doodle.bracketLoc;
				bracketLen.innerHTML = doodle.bracketLen;

				grandsStuff ( doodle );
				

			}

		}

		function updateInfoVisible ( newShit , oldShit ) {

			for (let x = 0; x < 2; x++) {


				// check if either TAG or TEAM changed
				if (newShit.players[x].tag != oldShit.players[x].tag || newShit.players[x].team != oldShit.players[x].team) {
					gsap.to(document.querySelectorAll(".wrappers")[x], {x:nameMove[x], startAt:{x:0}, duration:nameTime, opacity:0, delay:0, onComplete:function(){
		
						document.querySelectorAll(".names")[x].innerHTML = newShit.players[x].tag;
						console.log(document.querySelectorAll(".names")[x].innerHTML)

						if (eventRep.value.game == 'SUPLEX') {
							if (newShit.players[x].team === "") {
								document.querySelectorAll(".teams")[x].innerHTML = newShit.players[x].team;
							} else {
								document.querySelectorAll(".teams")[x].innerHTML = newShit.players[x].team + ' |';
							}
						} else {
							document.querySelectorAll(".teams")[x].innerHTML = newShit.players[x].team;
						}

						textFit(document.querySelectorAll(".wrappers")[x], {maxFontSize:nameSize, alignVert:true});
						gsap.to(document.querySelectorAll(".wrappers")[x], {x:0, startAt:{x:nameMove[x]}, duration:nameTime, opacity:1, delay:0});
					}});

				}

				// check if SCORE changed
	
				if (newShit.players[x].score != oldShit.players[x].score) {
					gsap.to(document.querySelectorAll(".scores")[x], {duration: scTime, opacity: 0, delay: 0, onComplete: function () {
						document.querySelectorAll(".scores")[x].innerHTML = matchRep.value.players[x].score;
						gsap.to(document.querySelectorAll(".scores")[x], { duration: scTime, opacity: 1, delay: 0 });
					}
				})};


				// check if CHARACTERS changed

				if (eventRep.value.game === "SSBM") {

					if (newShit.players[x].character != oldShit.players[x].character) {

						console.log('character side: ' + sideVal)

						gsap.to(document.querySelectorAll(".characters")[x], {duration: nameTime, opacity: 0, delay: 0, onComplete: function () {
							document.querySelectorAll(".characters")[x].setAttribute("src", `assets/MNM/img/chars/${sideVal[x]}/${newShit.players[x].character.toLowerCase()}.png`);
							gsap.to(document.querySelectorAll(".characters")[x], {duration: nameTime, opacity:1});
						}
					})};


				}

				// check if BRACKET changed

				if (newShit.bracketLoc != oldShit.bracketLoc || newShit.bracketLen != oldShit.bracketLen) {
					switch (eventRep.value.event) {
						case ('USW'):
							gsap.to("#rdWrapper", {duration: rdTime, opacity: 0, delay: 0, onComplete: function () {
							bracketLoc.innerHTML = matchRep.value.bracketLoc;
							bracketLen.innerHTML = matchRep.value.bracketLen;
							spacer.innerHTML = " - "
								
							textFit(document.getElementsByClassName('rdWrapperClass'), { maxFontSize: rdSize, alignVert: true });
							gsap.to("#rdWrapper", {duration: rdTime, opacity: 1, delay: 0 });
							}});
							break;
						default:
							if (newShit.bracketLoc != oldShit.bracketLoc) {
								gsap.to("#bracketLoc", {duration: rdTime, opacity: 0, delay: 0, onComplete: function () {
									bracketLoc.innerHTML = newShit.bracketLoc;
									textFit(document.getElementById('bracketLoc'), { maxFontSize: rdSize, alignVert: true });
									gsap.to("#bracketLoc", {duration: rdTime, opacity: 1, delay: 0 });
								}
							})};
				
							if (newShit.bracketLen != oldShit.bracketLen) {
								gsap.to("#bracketLen", {duration: rdTime, opacity: 0, delay: 0, onComplete: function () {
									bracketLen.innerHTML = newShit.bracketLen;
									textFit(document.getElementById('bracketLen'), { maxFontSize: rdSize, alignVert: true });
									gsap.to("#bracketLen", {duration: rdTime, opacity: 1, delay: 0 });
								}
							})};
							break;
						}};

					// if (newShit.players[0].grandsIndicator && newShit.players[1].grandsIndicator) {
						grandsStuff( newShit );
					

			}
		}

		if (startup == true) {

			gsap.to("#scoreBG", { duration: 0.3, opacity: 1, delay: 0 })

			// Load match replicant
			NodeCG.waitForReplicants(matchRep).then(() => {
				matchRep.value.isVisible = true;

				updateInfo (matchRep.value);

				
				switch (eventRep.value.event) {
					case ('USW'):
							spacer.innerHTML = " - "
							
							textFit(document.getElementsByClassName('rdWrapperClass'), { maxFontSize: rdSize, alignVert: true });
							gsap.to("#rdWrapper", {duration: rdTime, opacity: 1, delay: 0.3 });
						break;
						case ('MNM'):
							gsap.to("#seat1Character", {duration: nameTime, opacity:1, delay:nameTime});
							gsap.to("#seat2Character", {duration: nameTime, opacity:1, delay:nameTime});
						default:
							spacer.innerHTML = ""
							textFit(document.getElementsByClassName('rounds'), { maxFontSize: rdSize, alignVert: true });
							textFit(document.getElementsByClassName('formats'), { maxFontSize: rdSize, alignVert: true });
							
							gsap.to("#bracketLoc", {duration: rdTime, opacity: 1, delay: 0.3 });
							gsap.to("#bracketLen", {duration: rdTime, opacity: 1, delay: 0.3 });
							
						};

						gsap.to("#p1Wrapper", { x: 0, startAt: { x: nameMove[0] }, duration: nameTime, opacity: 1, delay: 0.3 });
						gsap.to("#p2Wrapper", { x: 0, startAt: { x: nameMove[1] }, duration: nameTime, opacity: 1, delay: 0.3 });
						gsap.to(".scores", { duration: scTime, opacity: 1, delay: 0 });
								
					});
					
				}
						
						
			matchRep.on('change', (newValue, oldValue) => {

				console.log('change event fired');

				if (newValue.isVisible != oldValue.isVisible) {
					switch (newValue.isVisible) {
						case false:
							console.log(newValue.isVisible)
							gsap.to("#scoreBG", { duration: 0.3, opacity: 0, delay: 0 })
							gsap.to("#p1Wrapper", { duration: 0.3, opacity: 0, delay: 0 });
							gsap.to("#p2Wrapper", { duration: 0.3, opacity: 0, delay: 0 });
							gsap.to(".scores", { duration: 0.3, opacity: 0, delay: 0 });
							gsap.to("#rdWrapper", {duration: 0.3, opacity: 0, delay: 0 });
							updateInfo (newValue);
							break;
						case true:
							console.log(newValue.isVisible)
							gsap.to("#scoreBG", { duration: 0.3, opacity: 1, delay: 0 })
							gsap.to("#p1Wrapper", { x: 0, startAt: { x: nameMove[0] }, duration: nameTime, opacity: 1, delay: 0.3 });
							gsap.to("#p2Wrapper", { x: 0, startAt: { x: nameMove[1] }, duration: nameTime, opacity: 1, delay: 0.3 });
							gsap.to(".scores", { duration: scTime, opacity: 1, delay: 0 });
							gsap.to("#rdWrapper", {duration: rdTime, opacity: 1, delay: 0.3 });
							updateInfoVisible (newValue, oldValue);
							break;
					}

				} else {
					switch (newValue.isVisible) {
						case true:
							updateInfoVisible (newValue, oldValue);
							break;
						case false:
							updateInfo (newValue);
					}
				}


		});
	}
}




