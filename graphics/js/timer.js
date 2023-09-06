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
  var topTextSize = 200;
  var topTextMove = '-128px';
  var topTextTime = 0.3;
  var topTextDelay = 0.4;

  // Timer text
  var botTextSize = 90;
  var botTextMove = '-93px';
  var botTextTime = 0.3;
  var botTextDelay = 0.5;

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
		
		link.href = `assets/${thisEvent}/panel.css`;
		
		head.appendChild(link);
		
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
  
  setTimeout(casterl3rd,100);
  
  function getData(){

    var timer;
    function timerBomb(duration) {
      timer = duration;
      var minutes, seconds;

      setInterval(function () {
          minutes = parseInt(timer / 60, 10)
          seconds = parseInt(timer % 60, 10);

          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;

          panelTimer.innerHTML = minutes + ":" + seconds;

          if (--timer < 0) {
            gsap.to("#panelTimer", {x:0, duration:botTextTime, opacity:0, delay:0 })
          }
        }, 1000);
      }

    function resetTimer(newVal) {
      timer = newVal;
    }
      
  
    
    const panelRep = nodecg.Replicant('misc');
    
    
    
    // Change will be called when the Replicant loads too, so we can use it to set the initial value.
    
    
    if (startup == true) {
      NodeCG.waitForReplicants(panelRep).then(() => {
        
        panelTop.innerHTML = panelRep.value.brbPanel[0];
        
        var timerInput = panelRep.value.brbPanel[2] * 60;
        panelTimer.innerHTML = panelRep.value.brbPanel[2] + ":00";
        timerBomb(timerInput)
        gsap.to("#panelTimer", { x: 0, startAt: { x: botTextMove }, duration: botTextTime, opacity: 1, delay: botTextDelay });
        
        
        textFit(document.getElementById('panelTop'), { maxFontSize: topTextSize, alignVert: true });
        gsap.to("#panelTop", { x: 0, startAt: { x: topTextMove }, duration: topTextTime, opacity: 1, delay: topTextDelay });
        
        
      });
      startup = false;
    }
    
    
    panelRep.on('change', (newValue, oldValue) => {
      if (newValue.brbPanel[0] != oldValue.brbPanel[0]) {
        gsap.to("#panelTop", {x:topTextMove, startAt:{x:0}, duration:topTextTime, opacity:0, delay:0, onComplete:function(){
          panelTop.innerHTML = newValue.brbPanel[0];
          textFit(document.getElementById('panelTop'), {maxFontSize:topTextSize, alignVert:true});
          gsap.to("#panelTop", {x:0, startAt:{x:topTextMove}, duration:topTextTime, opacity:1, delay:0});
        }});
      };
      
      if (newValue.brbPanel[2] != oldValue.brbPanel[2] || newValue.brbPanel[2] == oldValue.brbPanel[2]) {
        gsap.to("#panelTimer", {x:botTextMove, startAt:{x:0}, duration:botTextTime, opacity:0, delay:0, onComplete:function(){
          


          var timerInput = newValue.brbPanel[2] * 60;
          panelTimer.innerHTML = newValue.brbPanel[2] + ":00";
          resetTimer(timerInput)
          gsap.to("#panelTimer", {x:0, startAt:{x:botTextMove}, duration:botTextTime, opacity:1, delay:0});
        }});
      }});
    
    }
  }
  