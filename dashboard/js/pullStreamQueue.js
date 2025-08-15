let queueOutput = document.querySelector('#queueOutput');

async function startGGPull() {
  var query = `query QueueByStream($tourneySlug: String!) {
    tournament(slug: $tourneySlug) {
      streamQueue {
        sets {
          stream {
            streamName
          }
          fullRoundText
          event {
            tournament {
              name
            }
            videogame {
              name
            }
          }
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
          "tourneySlug": `tournament/${slug.value}`
      },
    }),
  })

  roundCatch = ["Winners Round 1", "Winners Round 2", "Winners Round 3", "Winners Round 4", "Winners Round 5", "Winners Round 6", "Winners Round 7", "Winners Round 8", "Winners Quarter-Final", "Winners Semi-Final", "Winners Final", "Grand Final", "Grand Final Reset", "Losers Round 1", "Losers Round 2", "Losers Round 3", "Losers Round 4", "Losers Round 5", "Losers Round 6", "Losers Round 7", "Losers Round 8", "Losers Quarter-Final", "Losers Semi-Final", "Losers Final"]

  const responded = await response.json();
  data = {};
  
  var streamLen = Object.keys(responded["data"]["tournament"]["streamQueue"]).length;
  var queueLen = 0;

  var correctedNum = 0;
  var setLen;
  var l3rdTop;

  let streamVal;
  let queueVal


  for ( streamVal = 0; streamVal < streamLen; streamVal++) {
    queueLen += Object.keys(responded["data"]["tournament"]["streamQueue"][streamVal]["sets"]).length;
    console.log(responded.data.tournament.streamQueue[streamVal].sets)


    for ( queueVal = 0; queueVal < queueLen; queueVal++) {

        console.log('start')
        console.log(elStreamName.value)
        console.log(queueVal)
        if (responded["data"]["tournament"]["streamQueue"][streamVal]["sets"][queueVal]["stream"]["streamName"] === elStreamName.value) {
          console.log('true');
        if (responded["data"]["tournament"]["streamQueue"][streamVal]["sets"][queueVal]["slots"][0]["entrant"] != null && responded["data"]["tournament"]["streamQueue"][streamVal]["sets"][queueVal]["slots"][1]["entrant"] != null ) {
      
          let qP1Tag = String(responded["data"]["tournament"]["streamQueue"][streamVal]["sets"][queueVal]["slots"][0]["entrant"]["participants"][0]["gamerTag"]) // gamertag
          let qP1Team = String(responded["data"]["tournament"]["streamQueue"][streamVal]["sets"][queueVal]["slots"][0]["entrant"]["participants"][0]["prefix"]) // perfix
          
          qP1Team = qP1Team.replace(/\|/g, '')
          if (qP1Team == 'null') {
            qP1Team = '';
          }
          
          let qP2Tag = String(responded["data"]["tournament"]["streamQueue"][streamVal]["sets"][queueVal]["slots"][1]["entrant"]["participants"][0]["gamerTag"]) // gamertag
          let qP2Team = String(responded["data"]["tournament"]["streamQueue"][streamVal]["sets"][queueVal]["slots"][1]["entrant"]["participants"][0]["prefix"]) // perfix
          qP2Team = qP2Team.replace(/\|/g, '')
          
          
          if (qP2Team == 'null') {
            qP2Team = '';
          }
          
          let qRound = String(responded["data"]["tournament"]["streamQueue"][streamVal]["sets"][queueVal]["fullRoundText"]) // full round name
          // let l3rdBottom = "FX Games & Console Repair";
          let l3rdBottom = String(responded["data"]["tournament"]["streamQueue"][streamVal]["sets"][queueVal]["event"]["tournament"]["name"]) // bracket name
    
          switch (true) {
            case (qRound.substring(0,13) == "Winners Round"):
              l3rdTop = "Winners Bracket";
              setLen = "Best of 3";
              qRound = "Winners Bracket";
              break;
            case (qRound == "Winners Quarter-Final"):
              l3rdTop = "Winners Quarterfinals";
              setLen = "Best of 3";
              qRound = "Winners Quarters";
              break;
            case (qRound == "Winners Semi-Final"):
              l3rdTop = "Winners Semifinal";
              setLen = "Best of 5";
              qRound = "Winners Semis";
              break;
            case (qRound == "Winners Final"):
              l3rdTop = "Winners Finals";
              setLen = "Best of 5";
              qRound = "Winners Finals";
              break;
            case (qRound.substring(0,12) == "Losers Round"):
              l3rdTop = "Losers Bracket";
              setLen = "Best of 3";
              qRound = "Losers Bracket";
              break;
            case (qRound == "Losers Quarter-Final"):
              l3rdTop = "Losers Quarterfinals";
              setLen = "Best of 5";
              qRound = "Losers Quarters";
              break;     
            case (qRound == "Losers Semi-Final"):
              l3rdTop = "Losers Semifinals";
              setLen = "Best of 5";
              qRound = "Losers Semis";
              break;
            case (qRound == "Losers Final"):
              l3rdTop = "Losers Finals";
              setLen = "Best of 5";
              qRound = "Losers Finals";
              break;
            case (qRound == "Grand Final"):
              l3rdTop = "Grand Finals";
              setLen = "Best of 5";
              qRound = "Grand Finals";
              break;
            case (qRound == "Grand Final Reset"):
              l3rdTop = "True Finals";
              setLen = "Best of 5";
              qRound = "True Finals";
              break;
          }
    
          if (eventRep.value.event == "GGST") {
            setLen = "Best of 5"
          };
            
          
          html +=
          `<table id="${correctedNum}">
          <tr>
            <td>
              <div>Result ${correctedNum+1}</div>
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
            <td>
              <input id="queueLowerThirdBottom"
              type="text" value="${l3rdBottom}"></input>
            </td>
          </tr>
          <tr>
            <td id="btn${correctedNum}">
              <button id="pushButton" onclick="testFunc(${correctedNum})">PUSH TO STREAM</button>
            </td>
          </tr>
          </table>
          <br>`
              
          correctedNum += 1
          queueOutput.innerHTML = html
          }  
      }
      }
    }
  }


      
      let testFunc = function(i) {

        // const matchRep = nodecg.Replicant('match');
        // var l3rdsRep = nodecg.Replicant('misc');

        if (keepPlayers.checked === true){
          matchRep.value.players = []

          let p1Obj = {
            "tag": document.querySelectorAll("#queueP1Tag")[i].value,
            "team": document.querySelectorAll("#queueP1Team")[i].value,
            "score": 0,
            "grandsIndicator": "",
            "character": ""
          }
  
        
          let p2Obj = {
            "tag": document.querySelectorAll("#queueP2Tag")[i].value,
            "team": document.querySelectorAll("#queueP2Team")[i].value,
            "score": 0,
            "grandsIndicator": "",
            "character": ""
          }
        
          matchRep.value.players.push(p1Obj)
          matchRep.value.players.push(p2Obj)
        }

        if (keepBracket.checked === true) {
          matchRep.value.bracketLoc = document.querySelectorAll("#queueBracketLoc")[i].value;
          matchRep.value.bracketLen = document.querySelectorAll("#queueBracketLen")[i].value;
        }

        if (keepLowerThirdsTop.checked === true) {
          l3rdsRep.value.l3rdTop = document.querySelectorAll("#queueBracketPhase")[i].value;
        }
        
        if (keepLowerThirdsBottom.checked === true) {
          l3rdsRep.value.l3rdBottom = document.querySelectorAll("#queueLowerThirdBottom")[i].value;
        }
        

        let hideHTML = document.getElementById(i);
        hideHTML.style.display = 'none';

      }

      const queueSetsBtn = document.querySelector('#queueSetsBtn');
      
      queueSetsBtn.onclick = () => {
        startGGPull();
      };