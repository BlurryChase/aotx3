const ws = require('ws')

module.exports = function (nodecg) {
  
  const wss = new ws.WebSocketServer({ port: 9095 })

  wss.on('connection', function connection(ws) {
    ws.on('error', console.error)

    ws.addEventListener('message', (event) => {

      if (event.data.includes('scoreTrue')) {
        matchRep.value.isVisible = true;
      } 
      else if (event.data.includes('scoreFalse')) {
        matchRep.value.isVisible = false;
      }
      else if (event.data.includes('commentaryTrue')) {
        commRep.value.isVisible = true;
      } 
      else if (event.data.includes('commentaryFalse')) {
        commRep.value.isVisible = false;
      }
      else if (event.data.includes('lowerThirdsTrue')) {
        miscRep.value.isVisible = true;
      } 
      else if (event.data.includes('lowerThirdsFalse')) {
        miscRep.value.isVisible = false;
      }
    });

    ws.send('your mother');
  });

  const matchRep = nodecg.Replicant('match');
  const commRep = nodecg.Replicant('comm');
  const miscRep = nodecg.Replicant('misc');
  const eventRep = nodecg.Replicant('events');


  
  console.log(matchRep.value);
  console.log(commRep.value);
  console.log(miscRep.value);
  console.log(eventRep.value);



}