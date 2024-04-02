module.exports = function (nodecg) {
  
  const matchRep = nodecg.Replicant('match');
  const commRep = nodecg.Replicant('comm');
  const miscRep = nodecg.Replicant('misc');
  const eventRep = nodecg.Replicant('events');


  
  console.log(matchRep.value);
  console.log(commRep.value);
  console.log(miscRep.value);
  console.log(eventRep.value);



}