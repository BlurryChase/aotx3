window.onload = init;

function init(){

  // general init variables
  var startup = true;
  var animate = false;  
  var nameSize = 50;

  // var for GSAP & Textfit, Player Team & Name
  var c1Move = '-144px';
  var c2Move = '144px';
  var nameTime = 0.3;
  var nameDelay = 0.1;
  
  // var for GSAP & Textfit, Player Team & Name 
  var twitterSize = 20;
  var twitter1Move = '-87px';
  var twitter2Move = '87px';
  var twitterTime = 0.3;
  var twitterDelay = 0.1;
  
  
  function casterl3rd (){
    if(startup == true){
      getData();
      startup = false;
      animate = true;
    }
    else{
      getData();
    }
  }
  
  setTimeout(casterl3rd,300);
  
  
  function getData(){
    // var

    const commRep = nodecg.Replicant('comm');
		
		
		if (startup == true) {
			NodeCG.waitForReplicants(commRep).then(() => {
        c1Tag.innerHTML = commRep.value.comm1Info[0];
        c1Team.innerHTML = commRep.value.comm1Info[1];
        c1Twitter.innerHTML = commRep.value.comm1Info[2];

				c2Tag.innerHTML = commRep.value.comm2Info[0];
        c2Team.innerHTML = commRep.value.comm2Info[1];
        c2Twitter.innerHTML = commRep.value.comm2Info[2];

				textFit(document.getElementsByClassName('wrappers'), {maxFontSize:nameSize, alignVert:true});
				textFit(document.getElementsByClassName('twitters'), {maxFontSize:twitterSize, alignVert:true});


				gsap.to("#c1Wrapper", {x:0, startAt:{x:c1Move}, duration:nameTime, opacity:1, delay:nameDelay});
				gsap.to("#c2Wrapper", {x:0, startAt:{x:c2Move}, duration:nameTime, opacity:1, delay:nameDelay});
				gsap.to("#c1Twitter", {x:0, startAt:{x:twitter1Move}, duration:twitterTime, opacity:1, delay:twitterDelay});
				gsap.to("#c2Twitter", {x:0, startAt:{x:twitter2Move}, duration:twitterTime, opacity:1, delay:twitterDelay});

				startup = false;
      });
		}

		// Change will be called when the Replicant loads too, so we can use it to set the initial value.
		
		commRep.on('change', (newValue, oldValue) => {
      console.log(newValue.comm1Info[0])
      // comm 1 tag / team
			if (newValue.comm1Info[0] != oldValue.comm1Info[0] || newValue.comm1Info[1] != oldValue.comm1Info[1]) {
				gsap.to("#c1Wrapper", {x:c1Move, startAt:{x:0}, duration:nameTime, opacity:0, delay:0, onComplete:function(){
					c1Tag.innerHTML = newValue.comm1Info[0];
					c1Team.innerHTML = newValue.comm1Info[1];
					textFit(document.getElementsByClassName('wrappers')[0], {maxFontSize:nameSize, alignVert:true});
					gsap.to("#c1Wrapper", {x:0, startAt:{x:c1Move}, duration:nameTime, opacity:1, delay:0});
				}});
			};

      
      // comm 1 twitter      
			if (newValue.comm1Info[2] != oldValue.comm1Info[2]) {
				gsap.to("#c1Twitter", {x:twitter1Move, startAt:{x:0}, duration:twitterTime, opacity:0, delay:0, onComplete:function(){
					c1Twitter.innerHTML = newValue.comm1Info[2];
					textFit(document.getElementsByClassName('twitters')[0], {maxFontSize:twitterSize, alignVert:true});
					gsap.to("#c1Twitter", {x:0, startAt:{x:twitter1Move}, duration:twitterTime, opacity:1, delay:0});
				}});
			};

      // comm 2 tag / team
			if (newValue.comm2Info[0] != oldValue.comm2Info[0] || newValue.comm2Info[1] != oldValue.comm2Info[1]) {
				gsap.to("#c2Wrapper", {x:c2Move, startAt:{x:0}, duration:nameTime, opacity:0, delay:0, onComplete:function(){
					c2Tag.innerHTML = newValue.comm2Info[0];
					c2Team.innerHTML = newValue.comm2Info[1];
					textFit(document.getElementsByClassName('wrappers')[1], {maxFontSize:nameSize, alignVert:true});
					gsap.to("#c2Wrapper", {x:0, startAt:{x:c2Move}, duration:nameTime, opacity:1, delay:0});
				}});
			};

			if (newValue.comm2Info[2] != oldValue.comm2Info[2]) {
				gsap.to("#c2Twitter", {x:twitter2Move, startAt:{x:0}, duration:twitterTime, opacity:0, delay:0, onComplete:function(){
					c2Twitter.innerHTML = newValue.comm2Info[2];
					textFit(document.getElementsByClassName('twitters')[1], {maxFontSize:twitterSize, alignVert:true});
					gsap.to("#c2Twitter", {x:0, startAt:{x:twitter2Move}, duration:twitterTime, opacity:1, delay:0});
				}});
			};
    });
      
  }

}