// Require express
const express = require('express')
const app = express()
const args = require('minimist')(process.argv.slice(2))
args['port']
const call = args.call
const port = args.port || process.env.PORT || 5000

// Import functions from module
export{coinFlip, coinFlips, countFlips, flipACoin} from "coin.mjs";

// Start the server
