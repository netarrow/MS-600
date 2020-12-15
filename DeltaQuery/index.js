const session = require('express-session');
const flash = require('connect-flash');
const msal = require('@azure/msal-node');
const express = require('express')
var graph = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');

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
   var result = await callGraphApiWithToken(res, response.accessToken)
   res.send(result)
});

async function callGraphApiWithToken(res, token) {
  var result = await getUserDetails(token)
  return result
}

function getAuthenticatedClient(accessToken) {
  // Initialize Graph client
  const client = graph.Client.init({
    // Use the provided access token to authenticate
    // requests
    authProvider: (done) => {
      done(null, accessToken);
    }
  });

  return client;
}

async function getUserDetails (accessToken) {
  const client = getAuthenticatedClient(accessToken);

  const user = await client
    .api('/users')
    .get();
  return user;
}

app.listen(3000)
console.log('started...')