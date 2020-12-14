const session = require('express-session');
const flash = require('connect-flash');
require("isomorphic-fetch")
const msal = require('@azure/msal-node');
const express = require('express')
const MicrosoftGraph = require("@microsoft/microsoft-graph-client")

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
        scopes: ["https://graph.microsoft.com/.default"],
    };
    app.locals.msalClient = new msal.ConfidentialClientApplication(msalConfig);
    const options = new MicrosoftGraph.MSALAuthenticationProviderOptions(graphScopes);
const authProvider = new MicrosoftGraph.ImplicitMSALAuthenticationProvider(app.locals.msalClient, options);
    let response = await app.locals.msalClient.acquireTokenByClientCredential(clientCredentialRequest)
    console.log("Response: ", response.accessToken);
    const optionswrapper = {
        authProvider, // An instance created from previous step
    };
    const client = MicrosoftGraph.Client.initWithMiddleware(optionswrapper);
    
   /*  try {
        let userDetails = await client.api("/me").get();
        console.log(userDetails);
        res.send(userDetails)
    } catch (error) {
        throw error;
    } */
});

app.listen(8181)
console.log('started...')