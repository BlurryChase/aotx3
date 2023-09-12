let queueOutput = document.querySelector('#queueOutput');
let streamName = document.querySelector('#streamName')

let slug = document.querySelector('#eventSlug');

// let api_t = document.querySelector('#apiKey');

let html = '';

const endpoint = 'https://api.start.gg/gql/alpha';

let api_t = "cea32593e025bf06fb5319f11c31022e";

const matchRep = nodecg.Replicant('match');
var l3rdsRep = nodecg.Replicant('misc');
let eventRep = nodecg.Replicant('events');

NodeCG.waitForReplicants(matchRep).then(() => {
  console.log('match reps loaded');
})
NodeCG.waitForReplicants(l3rdsRep).then(() => {
  console.log('other reps loaded');
})


async function startGGPull() {
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

  roundCatch = ["Winners Round 1", "Winners Round 2", "Winners Round 3", "Winners Round 4", "Winners Round 5", "Winners Round 6", "Winners Round 7", "Winners Round 8", "Winners Quarter-Final", "Winners Semi-Final", "Winners Final", "Grand Final", "Grand Final Reset", "Losers Round 1", "Losers Round 2", "Losers Round 3", "Losers Round 4", "Losers Round 5", "Losers Round 6", "Losers Round 7", "Losers Round 8", "Losers Quarter-Final", "Losers Semi-Final", "Losers Final"]

  const responded = await response.json();
  data = {};
  console.log(streamName.value)

  var setLen;
  var l3rdTop;

  
  for (let i = 0; i < 5; i++) {

    
    
    if (responded["data"]["tournament"]["streamQueue"][streamName.value]["sets"][i]["slots"][0]["entrant"] != null) {
      
      let qP1Tag = String(responded["data"]["tournament"]["streamQueue"][streamName.value]["sets"][i]["slots"][0]["entrant"]["participants"][0]["gamerTag"]) // gamertag
      let qP1Team = String(responded["data"]["tournament"]["streamQueue"][streamName.value]["sets"][i]["slots"][0]["entrant"]["participants"][0]["prefix"]) // perfix
      if (qP1Team == 'null') {
        qP1Team = '';
      }
      
      let qP2Tag = String(responded["data"]["tournament"]["streamQueue"][streamName.value]["sets"][i]["slots"][1]["entrant"]["participants"][0]["gamerTag"]) // gamertag
      let qP2Team = String(responded["data"]["tournament"]["streamQueue"][streamName.value]["sets"][i]["slots"][1]["entrant"]["participants"][0]["prefix"]) // perfix
      if (qP2Team == 'null') {
        qP2Team = '';
      }
      
      let qRound = String(responded["data"]["tournament"]["streamQueue"][streamName.value]["sets"][i]["fullRoundText"]) // full round name
      // let qPhase = String(responded["data"]["tournament"]["streamQueue"][streamName.value]["sets"][i]["phaseGroup"]["phase"]["name"]) // bracket name

      switch (true) {
        case (qRound.substring(0,13) == "Winners Round"):
          l3rdTop = "Winners Bracket";
          setLen = "Best of 3";
          if (eventRep.value.eventGame[0] == "USW") {
            qRound = "Winners";
          } else {
            qRound = "Winners Bracket";
          }
          break;
        case (qRound == "Winners Quarter-Final"):
          l3rdTop = "Winners Quarterfinal";
          setLen = "Best of 3";
          if (eventRep.value.eventGame[0] == "USW") {
            qRound = "W. Quarters";
          } else {
            qRound = "Winners Quarters";
          }
        case (qRound == "Winners Semi-Final"):
          l3rdTop = "Winners Semifinal";
          setLen = "Best of 5";
          if (eventRep.value.eventGame[0] == "USW") {
            qRound = "W. Semis";
          } else {
            qRound = "Winners Semis";
          }
          break;
        case (qRound == "Winners Final"):
          l3rdTop = "Winners Final";
          setLen = "Best of 5";
          qRound = "Winners Final";
          break;
        case (qRound.substring(0,12) == "Losers Round"):
          l3rdTop = "Losers Bracket";
          setLen = "Best of 3";
          if (eventRep.value.eventGame[0] == "USW") {
            qRound = "Losers";
          } else {
            qRound = "Losers Bracket";
          }
          break;
        case (qRound == "Losers Quarter-Final"):
          l3rdTop = "Losers Quarterfinal";
          setLen = "Best of 5";
          if (eventRep.value.eventGame[0] == "USW") {
            qRound = "L. Quarters";
          } else {
            qRound = "Losers Quarters";
          }
          break;     
        case (qRound == "Losers Semi-Final"):
          l3rdTop = "Losers Semifinal";
          setLen = "Best of 5";
          if (eventRep.value.eventGame[0] == "USW") {
            qRound = "L. Semis";
          } else {
            qRound = "Losers Semi";
          }
          break;
        case (qRound == "Losers Final"):
          l3rdTop = "Losers Final";
          setLen = "Best of 5";
          qRound = "Losers Final";
          break;
        case (qRound == "Grand Final"):
          l3rdTop = "Grand Final";
          setLen = "Best of 5";
          qRound = "Grand Final";
          break;
        case (qRound == "Grand Final Reset"):
          l3rdTop = "True Final";
          setLen = "Best of 5";
          qRound = "True Final";
          break;
      }

      if (eventRep.value.eventGame[1] == "GGST") {
        setLen = "Best of 5"
      };
        
      
      html +=
      `<table id="${i}">
      <tr>
        <td>
          <div>Result ${i+1}</div>
        </td>
      </tr>
      <tr>
        <td>
          <div>Players</div>
        </td>
      </tr>
      <tr>
        <td>
          <input id="queueP1Tag" type="text" value="${qP1Tag}"></input>
        </td>
        <td>
          <input id="queueP1Team" type="text" size="8" value="${qP1Team}"></input>
        </td>
      </tr>
      <tr>
        <td>
          <input id="queueP2Tag" type="text" value="${qP2Tag}"></input>
        </td>
        <td>
          <input id="queueP2Team" type="text" size="8" value="${qP2Team}"></input>
        </td>
      </tr>
      <tr>
        <td>
          <input id="queueBracketLoc"
          type="text" value="${qRound}"></input>
        </td>
        <td>
          <input id="queueBracketLen"
          type="text" size="8" value="${setLen}"></input>
        </td>
      </tr>
      <tr>
        <td>
          <div>Lower Thirds</div>
        </td>
      </tr>
      <tr>
        <td>
          <input id="queueBracketPhase"
          type="text" value="${l3rdTop}"></input>
        </td>
      </tr>
      <tr>
        <td id="btn${i}">
          <button id="pushButton" onclick="testFunc(${i})">PUSH TO STREAM</button>
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
        matchRep.value.bracketInfo.push(document.querySelectorAll("#queueBracketLen")[i].value);


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

