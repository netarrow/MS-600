const session = require('express-session');
const flash = require('connect-flash');
const msal = require('@azure/msal-node');
const express = require('express')
var graph = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');

require('dotenv').config();

var globalLink;

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


app.get('/delta', async function(req, res, next) {
  const clientCredentialRequest = {
      scopes: ["https://graph.microsoft.com/.default"]
  };
  app.locals.msalClient = new msal.ConfidentialClientApplication(msalConfig);
 let response = await app.locals.msalClient.acquireTokenByClientCredential(clientCredentialRequest)
 console.log("Response: ", response.accessToken);
 var result = await callGraphApiWithToken(res, response.accessToken, true)
 res.send(result)
});

async function callGraphApiWithToken(res, token, delta) {
  var result = await getUserDetails(token, delta)
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

async function getUserDetails (accessToken, delta) {
  const client = getAuthenticatedClient(accessToken);

  if(globalLink) {
    var user = await client
    .api(globalLink)
    .select('displayName')
    .get();
  } else {
   var user = await client
    .api('/users' + (delta ? '/delta' : '') + "?$top=5")
    .select('displayName')
    .get();
  }

  globalLink = user['@odata.nextLink'] || user['@odata.deltaLink']

  return user;
}

app.listen(3000)
console.log('started...')