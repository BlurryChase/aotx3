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

  // top text
  var topTextSize = 1;
  var topTextMove = '-128px';
  var topTextTime = 0.3;
  var topTextDelay = 0.3;

  // bottom text
  var botTextSize = 1;
  var botTextMove = '93px';
  var botTextTime = 0.3;
  var botTextDelay = 0.3;

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
		
		link.href = `assets/${thisEvent}/l3rd.css`;
		
		head.appendChild(link);

    // top text
    topTextSize = params[thisEvent]["topTextSize"];
    topTextMove = params[thisEvent]["topTextMove"];
    topTextTime = params[thisEvent]["topTextTime"];
    topTextDelay = params[thisEvent]["topTextDelay"];

    // bottom text
    botTextSize = params[thisEvent]["botTextSize"];
    botTextMove = params[thisEvent]["botTextMove"];
    botTextTime = params[thisEvent]["botTextTime"];
    botTextDelay = params[thisEvent]["botTextDelay"];
		
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
    
    
    const l3rdsRep = nodecg.Replicant('misc');

    
    
    // Change will be called when the Replicant loads too, so we can use it to set the initial value.
    
    
    if (startup == true) {
      NodeCG.waitForReplicants(l3rdsRep).then(() => {
        l3rdsTop.innerHTML = l3rdsRep.value.l3rdInfo[0];
        l3rdsBottom.innerHTML = l3rdsRep.value.l3rdInfo[1];

        textFit(document.getElementById('l3rdsTop'), { maxFontSize: topTextSize, alignVert: true });
        textFit(document.getElementById('l3rdsBottom'), { maxFontSize: botTextSize, minFontSize: 5, detectMultiLine: false, alignVert: true });
        
        
        gsap.to("#l3rdsTop", { x: 0, startAt: { x: topTextMove }, duration: topTextTime, opacity: 1, delay: topTextDelay });
        gsap.to("#l3rdsBottom", { x: 0, startAt: { x: botTextMove }, duration: botTextTime, opacity: 1, delay: botTextDelay });
      });
      startup = false;
    }
    
    
    l3rdsRep.on('change', (newValue, oldValue) => {
      if (newValue.l3rdInfo[0] != oldValue.l3rdInfo[0]) {
        gsap.to("#l3rdsTop", {x:topTextMove, startAt:{x:0}, duration:topTextTime, opacity:0, delay:0, onComplete:function(){
          l3rdsTop.innerHTML = newValue.l3rdInfo[0];
          textFit(document.getElementById('l3rdsTop'), {maxFontSize:topTextSize, alignVert:true});
          gsap.to("#l3rdsTop", {x:0, startAt:{x:topTextMove}, duration:topTextTime, opacity:1, delay:0});
        }});
      };
      
      if (newValue.l3rdInfo[1] != oldValue.l3rdInfo[1]) {
        gsap.to("#l3rdsBottom", {x:botTextMove, startAt:{x:0}, duration:botTextTime, opacity:0, delay:0, onComplete:function(){
          l3rdsBottom.innerHTML = newValue.l3rdInfo[1];
          textFit(document.getElementById('l3rdsBottom'), { maxFontSize: botTextSize, minFontSize: 5, detectMultiLine: false, alignVert: true });
          gsap.to("#l3rdsBottom", {x:0, startAt:{x:botTextMove}, duration:botTextTime, opacity:1, delay:0});
        }});
      }});
    
    }
  }
  