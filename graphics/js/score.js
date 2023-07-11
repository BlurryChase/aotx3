window.onload = init;

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

	const seperator = document.querySelector('#separator');

	seperator.innerHTML = "&nbsp-&nbsp";


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
		
		const matchRep = nodecg.Replicant('match', 'USW')

		if (startup == true) {

      NodeCG.waitForReplicants(matchRep).then(() => {
        p1Tag.innerHTML = matchRep.value.player1Info[0];
        p1Team.innerHTML = matchRep.value.player1Info[1];

				p1Score.innerHTML = matchRep.value.playerScore[0];

        p2Tag.innerHTML = matchRep.value.player2Info[0];
        p2Team.innerHTML = matchRep.value.player2Info[1];

				p2Score.innerHTML = matchRep.value.playerScore[1];

				bracketLoc.innerHTML = matchRep.value.bracketInfo[0];
				bracketLen.innerHTML = matchRep.value.bracketInfo[1];

				textFit(document.getElementsByClassName('wrappers'), { maxFontSize: nameSize, alignVert: true });
				textFit(document.getElementsByClassName('rdWrapperClass'), { maxFontSize: rdSize, alignVert: true });
	
				gsap.to("#p1Wrapper", { x: 0, startAt: { x: p1Move }, duration: nameTime, opacity: 1, delay: 0 });
				gsap.to("#p2Wrapper", { x: 0, startAt: { x: p2Move }, duration: nameTime, opacity: 1, delay: 0 });
				gsap.to("#rdWrapper", {duration: rdTime, opacity: 1, delay: 0 });
				gsap.to(".scores", { duration: scTime, opacity: 1, delay: 0 });

				startup = false;

      });


		}
		
		
		// Change will be called when the Replicant loads too, so we can use it to set the initial value.
		
		matchRep.on('change', (newValue, oldValue) => {

			if (newValue.player1Info[0] == oldValue.player1Info[0] && newValue.player1Info[1] == oldValue.player1Info[1]) {

			} else {
				gsap.to("#p1Wrapper", {x:p1Move, startAt:{x:0}, duration:nameTime, opacity:0, delay:0, onComplete:function(){
					p1Tag.innerHTML = newValue.player1Info[0];
					p1Team.innerHTML = newValue.player1Info[1];
					textFit(document.getElementsByClassName('wrappers')[0], {maxFontSize:nameSize, alignVert:true});
					gsap.to("#p1Wrapper", {x:0, startAt:{x:p1Move}, duration:nameTime, opacity:1, delay:0});
				}});
			};

			if (newValue.playerScore[0] == oldValue.playerScore[0]) {

			} else {
				gsap.to("#p1Score", {duration: scTime, opacity: 0, delay: 0, onComplete: function () {
					p1Score.innerHTML = newValue.playerScore[0];
					gsap.to("#p1Score", { duration: scTime, opacity: 1, delay: 0 });
				}
			})};

			if (newValue.player2Info[0] == oldValue.player2Info[0] && newValue.player2Info[1] == oldValue.player2Info[1]) {

			} else {
				gsap.to("#p2Wrapper", {x:p2Move, startAt:{x:0}, duration:nameTime, opacity:0, delay:0, onComplete:function(){
					p2Tag.innerHTML = newValue.player2Info[0];
					p2Team.innerHTML = newValue.player2Info[1];
					textFit(document.getElementsByClassName('wrappers')[1], {maxFontSize:nameSize, alignVert:true});
					gsap.to("#p2Wrapper", {x:0, startAt:{x:p2Move}, duration:nameTime, opacity:1, delay:0});
				}});
			};
			
			if (newValue.playerScore[1] == oldValue.playerScore[1]) {
				
			} else {
				gsap.to("#p2Score", {duration: scTime, opacity: 0, delay: 0, onComplete: function () {
					p2Score.innerHTML = newValue.playerScore[1];
					gsap.to("#p2Score", { duration: scTime, opacity: 1, delay: 0 });
				}
			})};
			
			if (newValue.bracketInfo[0] == oldValue.bracketInfo[0] && newValue.bracketInfo[1] == oldValue.bracketInfo[1]) {
				
			} else {
				gsap.to("#rdWrapper", {duration: rdTime, opacity: 0, delay: 0, onComplete: function () {
					bracketLoc.innerHTML = newValue.bracketInfo[0];
					bracketLen.innerHTML = newValue.bracketInfo[1];
					textFit(document.getElementsByClassName('rdWrapperClass'), { maxFontSize: rdSize, alignVert: true });
					gsap.to("#rdWrapper", {duration: rdTime, opacity: 1, delay: 0 });
				}
			})};
			
			if (newValue.playerGrands[0] && newValue.playerGrands[1]) {
				console.log(newValue.playerGrands[0]);
				const p1G = newValue.playerGrands[0];
				const p2G = newValue.playerGrands[1];	

				
				switch (true) {
					case (p1G === 'w' && p2G === 'l'):
						console.log(p1G)
						p1Grands.innerHTML = 'Winners';
						p2Grands.innerHTML = 'Losers';
						gsap.to("#grandsBG", { duration: scTime, opacity: 1, delay: scDelay});
						break;
					case (p1G === 'l' && p2G === 'w'):
						console.log(p2G)
						p1Grands.innerHTML = 'Losers';
						p2Grands.innerHTML = 'Winners';
						gsap.to("#grandsBG", { duration: scTime, opacity: 1, delay: scDelay});
						break;
					case (p1G === 'w' && p2G === 'w') || (p1G === 'l'&& p2G === 'l'):	
						p1Grands.innerHTML = 'Losers';
						p2Grands.innerHTML = 'Losers';
						gsap.to("#grandsBG", { duration: scTime, opacity: 1, delay: scDelay});
						break;
					}; 
			} else {
				gsap.to("#grandsBG", { duration: scTime, opacity: 0, delay: scDelay});
				};
		});
	}
}

