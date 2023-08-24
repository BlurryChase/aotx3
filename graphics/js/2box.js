window.onload = init;

var params = {}
fetch("js/params.json")
	.then((res) => res.json())
	.then((data) => {
		params = data;
	})

function init(){

  // general init variables
  var startup = true;

  // box text
  var boxTextSize = 60;
  var boxTextMove = '-128px';
  var boxTextTime = 0.3;
  var boxTextDelay = 0.3;

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
		
		link.href = `assets/${thisEvent}/2box.css`;
		
		head.appendChild(link);

    boxTextSize = 60;
    boxTextMove = '-128px';
    boxTextTime = 0.3;
    boxTextDelay = 0.3;
		
	})
	
	
	eventRep.on('change', (newValue, oldValue) => { 

		if (newValue.eventGame[0] != oldValue.eventGame[0]) {
			location.reload()
		}
	});
  
  
  function casterl3rd (){
    if(startup == true){
      getData();
    }
    else{
      getData();
    }
  }
  
  setTimeout(casterl3rd,300);
  
  function getData(){
    
    
    const boxRep = nodecg.Replicant('misc');

    
    
    // Change will be called when the Replicant loads too, so we can use it to set the initial value.
    
    
    if (startup == true) {
      NodeCG.waitForReplicants(boxRep).then(() => {
        bracketLoc.innerHTML = boxRep.value.l3rdInfo[0];

        textFit(document.getElementById('bracketLoc'), { maxFontSize: boxTextSize, alignVert: true, detectMultiLine: false});
        
        
        gsap.to("#bracketLoc", { x: 0, startAt: { x: boxTextMove }, duration: boxTextTime, opacity: 1, delay: boxTextDelay });
      startup = false;
    })
    startup = false;
  }
    
    
    boxRep.on('change', (newValue, oldValue) => {
      if (newValue.l3rdInfo[0] != oldValue.l3rdInfo[0]) {
        gsap.to("#bracketLoc", {x:boxTextMove, startAt:{x:0}, duration:boxTextTime, opacity:0, delay:0, onComplete:function(){
          bracketLoc.innerHTML = newValue.l3rdInfo[0];
          textFit(document.getElementById('bracketLoc'), {maxFontSize:boxTextSize, alignVert:true, detectMultiLine: false});
          gsap.to("#bracketLoc", {x:0, startAt:{x:boxTextMove}, duration:boxTextTime, opacity:1, delay:0});
        }});
      };
    
    });
  }
}