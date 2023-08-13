let queueOutput = document.querySelector('#queueOutput');
let streamName = document.querySelector('#streamName')

let slug = document.querySelector('#eventSlug');

// let api_t = document.querySelector('#apiKey');

let html = '';

const endpoint = 'https://api.start.gg/gql/alpha';

let api_t = "cea32593e025bf06fb5319f11c31022e";

const matchRep = nodecg.Replicant('match');
var l3rdsRep = nodecg.Replicant('misc');

NodeCG.waitForReplicants(matchRep).then(() => {
  console.log('match reps loaded');
})
NodeCG.waitForReplicants(l3rdsRep).then(() => {
  console.log('other reps loaded');
})

var query = `query QueueByStream($tourneySlug: String!) {
  tournament(slug: $tourneySlug) {
    streamQueue {
      stream {
        streamName
      }
      sets {
				fullRoundText
        phaseGroup {
          phase {
            name
          }
        }
        slots {
          entrant {
            participants {
              gamerTag
              prefix
            }
          }
        }
      }
    }
  }
},`

async function startGGPull() {
  html = ''
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
          "tourneySlug": slug.value,
      },
    }),
  })

  const responded = await response.json();
  data = {};
  console.log(streamName.value)

  
  for (let i = 0; i < 5; i++) {

    
    
    if (responded["data"]["tournament"]["streamQueue"][streamName.value]["sets"][i]["slots"][0]["entrant"] != null) {
      let qRound = String(responded["data"]["tournament"]["streamQueue"][streamName.value]["sets"][i]["fullRoundText"]) // full round name
      let qPhase = String(responded["data"]["tournament"]["streamQueue"][streamName.value]["sets"][i]["phaseGroup"]["phase"]["name"]) // bracket name
      
      let qP1Tag = String(responded["data"]["tournament"]["streamQueue"][streamName.value]["sets"][i]["slots"][0]["entrant"]["participants"][0]["gamerTag"]) // gamertag
      let qP1Team = String(responded["data"]["tournament"]["streamQueue"][streamName.value]["sets"][i]["slots"][0]["entrant"]["participants"][0]["prefix"]) // perfix
      
      let qP2Tag = String(responded["data"]["tournament"]["streamQueue"][streamName.value]["sets"][i]["slots"][1]["entrant"]["participants"][0]["gamerTag"]) // gamertag
      let qP2Team = String(responded["data"]["tournament"]["streamQueue"][streamName.value]["sets"][i]["slots"][1]["entrant"]["participants"][0]["prefix"]) // perfix
      
      html +=
      `<table id="${i}">
      <tr>
      <td>
      <div>Result ${i+1}</div>
      </td>
      </tr>
      <tr>
      <td>
        <input id="queueP1Tag" type="text" value="${qP1Tag}"></input>
      </td>
      <td>
        <input id="queueP1Team" type="text" size="6" value="${qP1Team}"></input>
      </td>
      </tr>
      <tr>
      <td>
      <input id="queueP2Tag" type="text" value="${qP2Tag}"></input>
      </td>
      <td>
      <input id="queueP2Team" type="text" size="6" value="${qP2Team}"></input>
      </td>
      </tr>
      <tr>
      <td>
      <input id="queueBracketLoc"
      type="text" value="${qRound}"></input>
      </td>
      <td>
      <div>To Players Dash</div>
      </td>
      </tr>
      <tr>
      <td>
      <input id="queueBracketPhase"
          type="text" value="${qPhase}"></input>
          </td>
          <td>
          <div>To Lower Thirds Dash</div>
          </td>
          </tr>
          <tr>
          <td id="btn${i}">
          <button id="pushButton" onclick="testFunc(${i})">PUSH</button>
          </td>
          </tr>
          </table>
          <br>`
          
          
          
          
        }
        queueOutput.innerHTML = html  
      }
      
      }
      
      let testFunc = function(i) {

        // const matchRep = nodecg.Replicant('match');
        // var l3rdsRep = nodecg.Replicant('misc');
        
        console.log(i)
        matchRep.value.player1Info = [];
        // fill array
        matchRep.value.player1Info.push(document.querySelectorAll("#queueP1Tag")[i].value);
        matchRep.value.player1Info.push(document.querySelectorAll("#queueP1Team")[i].value);
        // player 2 info
        matchRep.value.player2Info = [];
        // fill array
        matchRep.value.player2Info.push(document.querySelectorAll("#queueP2Tag")[i].value);
        matchRep.value.player2Info.push(document.querySelectorAll("#queueP2Team")[i].value);
        // push score
        matchRep.value.playerScore = [];
        // fill array
        matchRep.value.playerScore.push(0);
        matchRep.value.playerScore.push(0);
        // bracket info
        matchRep.value.bracketInfo = [];
        // fill array
        matchRep.value.bracketInfo.push(document.querySelectorAll("#queueBracketLoc")[i].value);
        matchRep.value.bracketInfo.push("Best of 3");

        // l3rds
        l3rdsRep.value.l3rdInfo = [];
        // fill array
        l3rdsRep.value.l3rdInfo.push(document.querySelectorAll("#queueBracketPhase")[i].value);
        l3rdsRep.value.l3rdInfo.push("FX Game & Console Repair, Plano TX");

        let hideHTML = document.getElementById(i);
        hideHTML.style.display = 'none';




      }

      const submitButton = document.querySelector('#submitButton');
      
      submitButton.onclick = () => {
        startGGPull();
      };

