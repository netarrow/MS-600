const session = require('express-session');
const flash = require('connect-flash');
require("isomorphic-fetch")
const msal = require('@azure/msal-node');
const express = require('express')
require('dotenv').config();

var app = express();

// MSAL config
const msalConfig = {
    auth: {
      clientId: process.env.OAUTH_APP_ID,
      authority: process.env.OAUTH_AUTHORITY,
      clientSecret: process.env.OAUTH_APP_SECRET
    },
    system: {
      loggerOptions: {
        loggerCallback(loglevel, message, containsPii) {
          console.log(message);
        },
        piiLoggingEnabled: false,
        logLevel: msal.LogLevel.Verbose,
      }
    }
  };

const graphScopes = ["user.read", "user.read.all"];
app.locals.users = {};


app.get('/', async function(req, res, next) {
    const clientCredentialRequest = {
        scopes: ["https://graph.microsoft.com/.default"]
    };
    app.locals.msalClient = new msal.ConfidentialClientApplication(msalConfig);
   let response = await app.locals.msalClient.acquireTokenByClientCredential(clientCredentialRequest)
   console.log("Response: ", response.accessToken);
   callGraphApiWithToken(res, response.accessToken)
});

function callGraphApiWithToken(res, token) {
  res.send('to call with ' + token)
}

app.listen(3000)
console.log('started...')