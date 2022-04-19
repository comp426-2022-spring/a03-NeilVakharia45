// Require express
const express = require('express')
const app = express()
const args = require('minimist')(process.argv.slice(2))
args['port']
const call = args.call
const port = args.port || process.env.PORT || 5000

// Import functions from module
//import{coinFlip, coinFlips, countFlips, flipACoin} from "C:\\Users\\Neil\\OneDrive\\UNC\\COMP426\\a03-NeilVakharia45\\coin.mjs";

// Start the server
const server = app.listen(port, () => {
    console.log("App listening on port %PORT%".replace("%PORT%", port))
});

// Functions
function coinFlip() {
    var result=Math.random();
    if(result<.5){
      return "tails";
    }
    else{
      return "heads";
    }
  }
  
  function coinFlips(flips) {
    var flipArray=[];
    for(var i=0; i<flips; i++){
      flipArray.push(coinFlip());
    }
    return flipArray;
  }
  
  function countFlips(array) {
    var headsCount=0, tailsCount=0;
    for(var i=0; i<array.length; i++){
      if(array[i] == "heads"){
        headsCount++;
      }
      else if(array[i] == "tails"){
        tailsCount++;
      }
    }
    let countObject={tails: tailsCount, heads:headsCount}
    return countObject;
  }
  
  function flipACoin(call) {
    var result;
    var flip=coinFlip();
    if(call.equals(flip)){
      result="win";
    }
    else{
      result="lose";
    }
    let coinObject={call:call, flip:flip, result:result};
    return coinObject;
  }

// Define all the endpoints
app.get('/app/', (req, res) => {
    // Respond with status 200
    res.statusCode = 200;
    // Respond with status message "OK"
    res.statusMessage = 'OK';
    res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
    res.end(res.statusCode+ ' ' +res.statusMessage)
});

app.get('/app/flip', (req, res) => {
    res.send({flip: coinFlip()})
});

app.get('/app/flips/:number', (req, res) =>{
    res.send(coinFlips(req.params.number))
});

app.get('app/flip/call/heads', (req, res) => {
    res.status(200).json(flipACoin("heads"))
});

app.get('app/flip/call/tails', (req, res) => {
    res.status(200).json(flipACoin("tails"))
});

// Default response
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});