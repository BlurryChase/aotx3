let elStreamName = document.querySelector('#streamName')

let slug = document.querySelector('#eventSlug');

// let api_t = document.querySelector('#apiKey');

let html = '';

const endpoint = 'https://api.start.gg/gql/alpha';

let api_t = "8d1caa4f7c81e2b01a8e5351f6d3461f";

const matchRep = nodecg.Replicant('match');
var l3rdsRep = nodecg.Replicant('misc');
let eventRep = nodecg.Replicant('events');

NodeCG.waitForReplicants(matchRep).then(() => {
  console.log('match reps loaded');
})
NodeCG.waitForReplicants(l3rdsRep).then(() => {
  console.log('other reps loaded');
})

async function pullStreams() {
  var query = `query QueueByStream($tourneySlug: String!) {
    tournament(slug: $tourneySlug) {
      streams {
        streamName
      }
    }
  },`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      "Authorization": "Bearer " + api_t,
      'Content-Type': 'application.json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
          "tourneySlug": `tournament/${slug.value}`
      },
    }),
  });


  console.log(elStreamName.length);
  for (let x = 0; x < elStreamName.length;) {
    elStreamName.options.remove(x);
  };

  const pullResponse = await response.json();

  console.log(pullResponse);

  const numOfStreams = Object.keys(pullResponse["data"]["tournament"]["streams"]).length;
  console.log(numOfStreams);

  for (let i = 0; i < numOfStreams; i++) {
    let pulledStreams = pullResponse["data"]["tournament"]["streams"][i]["streamName"];
    elStreamName.options[elStreamName.options.length] = new Option(pulledStreams, pulledStreams);

  }

};

const streamsBtn = document.querySelector('#streamsBtn');
      
streamsBtn.onclick = () => {
  pullStreams();
};
