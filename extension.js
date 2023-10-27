module.exports = function (nodecg) {
  
  const nodeServer = nodecg.getSocketIOServer();

  nodeServer.on('connection', () => {
    console.log('hello');
  })


  console.log(nodeServer.sockets)
}