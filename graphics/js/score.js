window.onload = init;

var params = {}
fetch("js/params.json")
	.then((res) => res.json())
	.then((data) => {
		params = data;
	})

function init(){
	
	var startup = true;
	var animated = false;
	
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
		let thisEvent = eventRep.value.eventGame[0];
		console.log(thisEvent)
		let thisGame = eventRep.value.eventGame[1];
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

		p1Move = params[thisEvent]["p1Move"]; // px move for p1
		p2Move = params[thisEvent]["p2Move"]; // px move for p2
		
		rdSize = params[thisEvent]["rdSize"]; // round size
		rdTime = params[thisEvent]["rdTime"]; // round time
		
		scTime = params[thisEvent]["scTime"]; // score timer
		scDelay = params[thisEvent]["scDelay"]; // delay for score timer
		
		bgVid.play()
		
	})
	
	
	eventRep.on('change', (newValue, oldValue) => { 

		if (newValue.eventGame[0] != oldValue.eventGame[0] || newValue.eventGame[1] != oldValue.eventGame[1]) {
			location.reload()
			startup = true;
		}

	});
	
	
	
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

		if (startup == true) {

			gsap.to("#scoreBG", { duration: 0.3, opacity: 1, delay: 0 })

			// Load match replicant
			NodeCG.waitForReplicants(matchRep).then(() => {
				p1Tag.innerHTML = matchRep.value.player1Info[0];

				if (eventRep.value.eventGame[0] == 'SUPLEX') {
					if (matchRep.value.player1Info[1] === "") {
						p1Team.innerHTML = matchRep.value.player1Info[1];
					} else {
						p1Team.innerHTML = matchRep.value.player1Info[1] + ' |';
					}
				} else {
					p1Team.innerHTML = matchRep.value.player1Info[1];
				}
				
				p1Score.innerHTML = matchRep.value.playerScore[0];
				
        p2Tag.innerHTML = matchRep.value.player2Info[0];

				if (eventRep.value.eventGame[0] == 'SUPLEX') {
					if (matchRep.value.player2Info[1] === "") {
						p2Team.innerHTML = matchRep.value.player2Info[1];
					} else {
						p2Team.innerHTML = matchRep.value.player2Info[1] + ' |';
					}
				} else {
					p2Team.innerHTML = matchRep.value.player2Info[1];
				}
				
				p2Score.innerHTML = matchRep.value.playerScore[1];
				
				var char1 = matchRep.value.playerCharacters[0];
				var char2 = matchRep.value.playerCharacters[1];

				textFit(document.getElementsByClassName('wrappers'), { maxFontSize: nameSize, alignVert: true });
				gsap.to("#p1Wrapper", { x: 0, startAt: { x: p1Move }, duration: nameTime, opacity: 1, delay: 0.3 });
				gsap.to("#p2Wrapper", { x: 0, startAt: { x: p2Move }, duration: nameTime, opacity: 1, delay: 0.3 });
				gsap.to(".scores", { duration: scTime, opacity: 1, delay: 0 });

				switch (eventRep.value.eventGame[0]) {
					case ('USW'):
						bracketLoc.innerHTML = matchRep.value.bracketInfo[0];
						bracketLen.innerHTML = ` - ${matchRep.value.bracketInfo[1]}`;
						
						textFit(document.getElementsByClassName('rdWrapperClass'), { maxFontSize: rdSize, alignVert: true });
						gsap.to("#rdWrapper", {duration: rdTime, opacity: 1, delay: 0.3 });
						break;
					case ('MNM'):		
						document.getElementById("seat1Character").setAttribute("src", `assets/MNM/img/chars/LeftSide/${char1}.png`);
						document.getElementById("seat2Character").setAttribute("src", `assets/MNM/img/chars/RightSide/${char2}.png`);

						gsap.to("#seat1Character", {duration: nameTime, opacity:1, delay:nameTime});
						gsap.to("#seat2Character", {duration: nameTime, opacity:1, delay:nameTime});
					default:
						bracketLoc.innerHTML = matchRep.value.bracketInfo[0];
						bracketLen.innerHTML = matchRep.value.bracketInfo[1];
						
						textFit(document.getElementsByClassName('rounds'), { maxFontSize: rdSize, alignVert: true });
						textFit(document.getElementsByClassName('formats'), { maxFontSize: rdSize, alignVert: true });
						
						gsap.to("#bracketLoc", {duration: rdTime, opacity: 1, delay: 0.3 });
						gsap.to("#bracketLen", {duration: rdTime, opacity: 1, delay: 0.3 });
						
					}	
								
					startup = false;
								
					});
							
				}
						
						
			matchRep.on('change', (newValue, oldValue) => {

			// Player 1

			// team + name

			if (newValue.player1Info[0] != oldValue.player1Info[0] || newValue.player1Info[1] != oldValue.player1Info[1]) {
				gsap.to("#p1Wrapper", {x:p1Move, startAt:{x:0}, duration:nameTime, opacity:0, delay:0, onComplete:function(){

					if (eventRep.value.eventGame[0] == 'SUPLEX') {
						if (newValue.player1Info[1] === "") {
							p1Team.innerHTML = newValue.player1Info[1];
						} else {
							p1Team.innerHTML = newValue.player1Info[1] + ' |';
						}
					} else {
						p1Team.innerHTML = newValue.player1Info[1];
					}

					p1Tag.innerHTML = newValue.player1Info[0];
					textFit(document.getElementsByClassName('wrappers')[0], {maxFontSize:nameSize, alignVert:true});
					gsap.to("#p1Wrapper", {x:0, startAt:{x:p1Move}, duration:nameTime, opacity:1, delay:0});
				}});
			};

			// score

			if (newValue.playerScore[0] != oldValue.playerScore[0]) {
				gsap.to("#p1Score", {duration: scTime, opacity: 0, delay: 0, onComplete: function () {
					p1Score.innerHTML = newValue.playerScore[0];
					gsap.to("#p1Score", { duration: scTime, opacity: 1, delay: 0 });
				}
			})};

			
			if (eventRep.value.eventGame[1] == 'SSBM') {
				
				// MELEE ONLY - player 1 Character
				
				if (newValue.playerCharacters[0] != oldValue.playerCharacters[0]) {
					gsap.to("#seat1Character", {duration: nameTime, opacity: 0, delay: 0, onComplete: function () {
						char1 = newValue.playerCharacters[0];
						document.getElementById("seat1Character").setAttribute("src", `assets/MNM/img/chars/LeftSide/${char1}.png`);
						gsap.to("#seat1Character", {duration: nameTime, opacity:1});
					}
				})};

				// MELEE ONLY - player 2 Character
	
				if (newValue.playerCharacters[1] != oldValue.playerCharacters[1]) {
					gsap.to("#seat2Character", {duration: nameTime, opacity: 0, delay: 0, onComplete: function () {
						char2 = newValue.playerCharacters[1];
						document.getElementById("seat2Character").setAttribute("src", `assets/MNM/img/chars/RightSide/${char2}.png`);
						gsap.to("#seat2Character", {duration: nameTime, opacity:1});
					}
				})};			

			}

			// Player 2

			// Team + Name

			if (newValue.player2Info[0] != oldValue.player2Info[0] || newValue.player2Info[1] != oldValue.player2Info[1]) {
				gsap.to("#p2Wrapper", {x:p2Move, startAt:{x:0}, duration:nameTime, opacity:0, delay:0, onComplete:function(){

					if (eventRep.value.eventGame[0] == 'SUPLEX') {
						if (newValue.player2Info[1] === "") {
							p2Team.innerHTML = newValue.player2Info[1];
						} else {
							p2Team.innerHTML = newValue.player2Info[1] + ' |';
						}
					} else {
						p2Team.innerHTML = newValue.player2Info[1];
					}

					p2Tag.innerHTML = newValue.player2Info[0];
					textFit(document.getElementsByClassName('wrappers')[1], {maxFontSize:nameSize, alignVert:true});
					gsap.to("#p2Wrapper", {x:0, startAt:{x:p2Move}, duration:nameTime, opacity:1, delay:0});
				}});
			};

			// Score
			
			if (newValue.playerScore[1] != oldValue.playerScore[1]) {
				gsap.to("#p2Score", {duration: scTime, opacity: 0, delay: 0, onComplete: function () {
					p2Score.innerHTML = newValue.playerScore[1];
					gsap.to("#p2Score", { duration: scTime, opacity: 1, delay: 0 });
				}
			})};


			// Bracket Info
			
			if (newValue.bracketInfo[0] != oldValue.bracketInfo[0] || newValue.bracketInfo[1] != oldValue.bracketInfo[1]) {
				switch (eventRep.value.eventGame[0]) {
					case ('USW'):
						gsap.to("#rdWrapper", {duration: rdTime, opacity: 0, delay: 0, onComplete: function () {
						bracketLoc.innerHTML = matchRep.value.bracketInfo[0];
						bracketLen.innerHTML = ` - ${matchRep.value.bracketInfo[1]}`;
							
						textFit(document.getElementsByClassName('rdWrapperClass'), { maxFontSize: rdSize, alignVert: true });
						gsap.to("#rdWrapper", {duration: rdTime, opacity: 1, delay: 0 });
						}});
						break;
					default:
						if (newValue.bracketInfo[0] != oldValue.bracketInfo[0]) {
							gsap.to("#bracketLoc", {duration: rdTime, opacity: 0, delay: 0, onComplete: function () {
								bracketLoc.innerHTML = newValue.bracketInfo[0];
								textFit(document.getElementById('bracketLoc'), { maxFontSize: rdSize, alignVert: true });
								gsap.to("#bracketLoc", {duration: rdTime, opacity: 1, delay: 0 });
							}
						})};
			
						if (newValue.bracketInfo[1] != oldValue.bracketInfo[1]) {
							gsap.to("#bracketLen", {duration: rdTime, opacity: 0, delay: 0, onComplete: function () {
								bracketLen.innerHTML = newValue.bracketInfo[1];
								textFit(document.getElementById('bracketLen'), { maxFontSize: rdSize, alignVert: true });
								gsap.to("#bracketLen", {duration: rdTime, opacity: 1, delay: 0 });
							}
						})};
						break;
					}};

			// Grands Indicators
			
			if (newValue.playerGrands[0] && newValue.playerGrands[1]) {
				let p1G = newValue.playerGrands[0];
				let p2G = newValue.playerGrands[1];
				
				console.log(eventRep.value.eventGame[1])

				p1G = p1G.toLowerCase();
				p2G = p2G.toLowerCase();

				let winners = ''
				let losers = ''

				if (eventRep.value.eventGame[1] === 'GGST' || eventRep.value.eventGame[1] === 'SF6') {
					winners = 'W';
					losers = 'L';
				} else {
					winners = 'Winners';
					losers = 'Losers';
				}

				
				switch (true) {
					case (p1G.toLowerCase() === 'w' && p2G.toLowerCase() === 'l'):
						console.log(p1G)
						p1Grands.innerHTML = winners;
						p2Grands.innerHTML = losers;
						gsap.to("#grandsBG", { duration: scTime, opacity: 1, delay: scDelay});
						break;
					case (p1G === 'l' && p2G === 'w'):
						console.log(p2G)
						p1Grands.innerHTML = losers;
						p2Grands.innerHTML = winners;
						gsap.to("#grandsBG", { duration: scTime, opacity: 1, delay: scDelay});
						break;
					case (p1G === 'w' && p2G === 'w') || (p1G === 'l'&& p2G === 'l'):	
						p1Grands.innerHTML = losers;
						p2Grands.innerHTML = losers;
						gsap.to("#grandsBG", { duration: scTime, opacity: 1, delay: scDelay});
						break;
					}; 
			} else {
				gsap.to("#grandsBG", { duration: scTime, opacity: 0, delay: scDelay});
				};
		});
	
	}
}

