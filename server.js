// Require express
const express = require('express')
const app = express()
const args = require('minimist')(process.argv.slice(2))
args['port']
const call = args.call
const port = args.port || process.env.PORT || 5000

// Import functions from module
import{coinFlip, coinFlips, countFlips, flipACoin} from "coin.mjs";

// Start the server
const server = app.listen(port, () => {
    console.log("App listening on port %PORT%".replace("%PORT%", port))
});

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
app.use(function(res, req){
    res.status(404).send('404 NOT FOUND')
});