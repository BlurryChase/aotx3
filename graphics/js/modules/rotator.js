nodecg.readReplicant('events', 'tlocCG', value => {
    console.log(value.eventGame[0]);

    var images = params[value.eventGame[0]]["gameRotator"];
    var rotatorBug = document.getElementById("rotatorBug");
    var rotateVar = 0;
    gsap.to("#rotatorBug", {opacity:0, duration: 0.3, onComplete: function(){
        rotatorBug.src = `assets/${value.eventGame[0]}/img/rotator/${images[rotateVar]}.png`;
        gsap.to("#rotatorBug", {opacity:1, duration: 0.3, delay: 0.5})
    }})

    
    setInterval(function() {
        gsap.to("#rotatorBug", {opacity:0, duration: 0.3, onComplete: function(){
            rotatorBug.src = `assets/${value.eventGame[0]}/img/rotator/${images[rotateVar]}.png`;
            gsap.to("#rotatorBug", {opacity:1, duration: 0.3, delay: 0.3})

        }})
        rotateVar += 1;
        if (rotateVar == 3) {
            rotateVar = 0;
        };

    }, 5000);

}) 