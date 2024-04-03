window.onload = init;

var params = {}
fetch("js/params.json")
	.then((res) => res.json())
	.then((data) => {
		params = data;
	})

function init(){

  // general init variables 
  var nameSize = 50;

  // var for GSAP & Textfit, Player Team & Name
  var commMove = ['-144px', '144px'];
  var nameTime = 0.3;
  var nameDelay = 0.1;
  
  // var for GSAP & Textfit, Player Team & Name 
  var twitterSize = 20;
  var twitterMove = ['-87px','87px'];
  var twitterTime = 0.3;
  var twitterDelay = 0.1;

	const eventRep = nodecg.Replicant('events') 
	// create the link for the html page
	let head = document.getElementsByTagName('HEAD')[0];
	
	let link = document.createElement('link');
	
	link.rel = 'stylesheet';
	
	link.type = 'text/css';

	NodeCG.waitForReplicants(eventRep).then(() => {
		// load replicants
		let thisEvent = eventRep.value.event;
		
		link.href = `assets/${thisEvent}/comm.css`;
		
		head.appendChild(link);

		nameSize = params[thisEvent]["commNameSize"];

		// var for GSAP & Textfit, Player Team & Name
		commMove = params[thisEvent]["commMove"];
		nameTime = params[thisEvent]["nameTime"];
		nameDelay = params[thisEvent]["nameDelay"];
		
		// var for GSAP & Textfit, Player Team & Name 
		twitterSize = params[thisEvent]["twitterSize"];
		twitterMove = params[thisEvent]["twitterMove"];
		twitterTime = params[thisEvent]["twitterTime"];
		twitterDelay = params[thisEvent]["twitterDelay"];

	})

	eventRep.on('change', (newValue, oldValue) => { 

		if (newValue.event != oldValue.event) {
			location.reload()
		}
	});
  
  
  function casterl3rd (){
      getData();
    
  }
  
  setTimeout(casterl3rd,300);
  
  
  function getData(){

	function updateInfo ( doodle ) {

		for ( let i = 0; i < 2; i++ ) {

			document.querySelectorAll(".name")[i].innerHTML = doodle.caster[i].name;
			document.querySelectorAll(".team")[i].innerHTML = doodle.caster[i].team;
			document.querySelectorAll(".twitters")[i].innerHTML = doodle.caster[i].twitter;			

		}

	}

	function updateInfoVisible (newShit, oldShit) {
		console.log('ping')

		for (let i = 0; i < 2; i++) {


			if (newShit.caster[i].name != oldShit.caster[i].name || newShit.caster[i].team != oldShit.caster[i].team) {
				gsap.to(document.querySelectorAll(".wrappers")[i], {x:commMove[i], startAt:{x:0}, duration:nameTime, opacity:0, delay:0, onComplete:function(){
					document.querySelectorAll(".name")[i].innerHTML = newShit.caster[i].name;
					document.querySelectorAll(".team")[i].innerHTML = newShit.caster[i].team;
					textFit(document.querySelectorAll(".wrappers")[i], {maxFontSize:nameSize, alignVert:true});
					gsap.to(document.querySelectorAll(".wrappers")[i], {x:0, startAt:{x:commMove[i]}, duration:nameTime, opacity:1, delay:0});
				}});
			};

	  
			if (newShit.caster[i].twitter != oldShit.caster[i].twitter) {
				gsap.to(document.querySelectorAll(".twitters")[i], {x:twitterMove[i], startAt:{x:0}, duration:twitterTime, opacity:0, delay:0, onComplete:function(){
					document.querySelectorAll(".twitters")[i].innerHTML = newShit.caster[i].twitter;
					textFit(document.querySelectorAll('.twitters')[i], {maxFontSize:twitterSize, alignVert:true});
					gsap.to(document.querySelectorAll(".twitters")[i], {x:0, startAt:{x:twitterMove[i]}, duration:twitterTime, opacity:1, delay:0});
				}});
			};
		}
	}
    


    const commRep = nodecg.Replicant('comm');

	gsap.to("#commBG", {duration: 0.3, opacity: 1, delay: 0});
	
	NodeCG.waitForReplicants(commRep).then(() => {
		commRep.value.isVisible = true;

		updateInfo (commRep.value);

		textFit(document.getElementsByClassName('wrappers'), {maxFontSize:nameSize, alignVert:true});
		textFit(document.getElementsByClassName('twitters'), {maxFontSize:twitterSize, alignVert:true});


		gsap.to("#c1Wrapper", {x:0, startAt:{x:commMove[0]}, duration:nameTime, opacity:1, delay:nameDelay});
		gsap.to("#c2Wrapper", {x:0, startAt:{x:commMove[1]}, duration:nameTime, opacity:1, delay:nameDelay});
		gsap.to("#c1Twitter", {x:0, startAt:{x:twitterMove[0]}, duration:twitterTime, opacity:1, delay:twitterDelay});
		gsap.to("#c2Twitter", {x:0, startAt:{x:twitterMove[1]}, duration:twitterTime, opacity:1, delay:twitterDelay});
      });
		

		// Change will be called when the Replicant loads too, so we can use it to set the initial value.
		
	commRep.on('change', (newValue, oldValue) => {

		console.log('change event fired');
		console.log(newValue.isVisible)



	  if (newValue.isVisible != oldValue.isVisible) {
		switch (newValue.isVisible) {
			case false:

				gsap.to("#commBG", { duration: 0.3, opacity: 1, delay: 0.3, ease: "power1.in", y:500 })
				gsap.to("#comm", { duration: 0.3, opacity: 0, delay: 0 });
				gsap.to("#c1Wrapper", { duration: 0.3, opacity: 0, delay: 0 });
				gsap.to("#c2Wrapper", { duration: 0.3, opacity: 0, delay: 0 });
				gsap.to("#c1Twitter", { duration: 0.3, opacity: 0, delay: 0 });
				gsap.to("#c2Twitter", { duration: 0.3, opacity: 0, delay: 0 });
				break;
			case true:
				console.log(newValue.isVisible)
				gsap.to("#commBG", { duration: 0.3, opacity: 1, delay: 0, ease: "power1.out", y:0 })
				gsap.to("#comm", { duration: 0.3, opacity: 1, delay: 0 });
				gsap.to("#c1Wrapper", { x: 0, startAt: { x: commMove[0] }, duration: nameTime, opacity: 1, delay: 0.3 });
				gsap.to("#c2Wrapper", { x: 0, startAt: { x: commMove[1] }, duration: nameTime, opacity: 1, delay: 0.3 });
				gsap.to("#c1Twitter", { x: 0, startAt: { x: twitterMove[0] }, duration: nameTime, opacity: 1, delay: 0.3 });
				gsap.to("#c2Twitter", { x: 0, startAt: { x: twitterMove[1] }, duration: nameTime, opacity: 1, delay: 0.3 });
				break;
			}; 
		} else {
			switch (newValue.isVisible) {
				case true:
					console.log('visible change')
					updateInfoVisible (newValue, oldValue);
					break;
				case false:
					console.log('invisible change')
					updateInfo (newValue);
					console.log(newValue.caster[0].name)
					break;
			
		}

	}
    });
      
  }

}