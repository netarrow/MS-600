var express = require("express");
var app = express();
var morgan = require("morgan");
var path = require("path");

var port = 3007;
app.use(morgan("dev"));

// set the front-end folder to serve public assets.
app.use(express.static("web"));
const fetch = require("node-fetch");

// set up our one route to the index.html file.
app.get("*", async function (req, res) {
  try {
   await send()
   res.send('done')
  } catch (error) {
    res.send('ops ' + error)
  }
});

// Start the server.
app.listen(port);
console.log(`Listening on port ${port}...`);
console.log("Press CTRL+C to stop the web server...");

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
    'Content-Type': 'application/json'
    // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response // parses JSON response into native JavaScript objects
}

function send () {
console.log('send')
    return  postData('https://m365x605511.webhook.office.com/webhookb2/d3e7b3e8-7c75-4e81-b093-dbd8dd06a1e8@39076c6b-ee10-466c-b264-14a5350b127e/IncomingWebhook/2fd95434a4de4ada878cf5b3714569cb/e1daff68-a373-4ce6-8ce6-a8ccc38f9bac', 
    {
      "@type": "MessageCard",
      "@context": "http://schema.org/extensions",
      "themeColor": "0076D7",
      "summary": "Larry Bryant created a new task",
      "sections": [{
          "activityTitle": "Larry Bryant created a new task",
          "activitySubtitle": "On Project Tango",
          "activityImage": "https://teamsnodesample.azurewebsites.net/static/img/image5.png",
          "facts": [{
              "name": "Assigned to",
              "value": "Unassigned"
          }, {
              "name": "Due date",
              "value": "Mon May 01 2017 17:07:18 GMT-0700 (Pacific Daylight Time)"
          }, {
              "name": "Status",
              "value": "Not started"
          }],
          "markdown": true
      }],
      "potentialAction": [{
          "@type": "ActionCard",
          "name": "Add a comment",
          "inputs": [{
              "@type": "TextInput",
              "id": "comment",
              "isMultiline": false,
              "title": "Add a comment here for this task"
          }],
          "actions": [{
              "@type": "HttpPOST",
              "name": "Add comment",
              "target": "https://docs.microsoft.com/outlook/actionable-messages"
          }]
      }, {
          "@type": "ActionCard",
          "name": "Set due date",
          "inputs": [{
              "@type": "DateInput",
              "id": "dueDate",
              "title": "Enter a due date for this task"
          }],
          "actions": [{
              "@type": "HttpPOST",
              "name": "Save",
              "target": "https://docs.microsoft.com/outlook/actionable-messages"
          }]
      }, {
          "@type": "OpenUri",
          "name": "Learn More",
          "targets": [{
              "os": "default",
              "uri": "https://docs.microsoft.com/outlook/actionable-messages"
          }]
      }, {
          "@type": "ActionCard",
          "name": "Change status",
          "inputs": [{
              "@type": "MultichoiceInput",
              "id": "list",
              "title": "Select a status",
              "isMultiSelect": "false",
              "choices": [{
                  "display": "In Progress",
                  "value": "1"
              }, {
                  "display": "Active",
                  "value": "2"
              }, {
                  "display": "Closed",
                  "value": "3"
              }]
          }],
          "actions": [{
              "@type": "HttpPOST",
              "name": "Save",
              "target": "https://docs.microsoft.com/outlook/actionable-messages"
          }]
      }]
  }
        ).then(data => {
          console.log(data)
        })
}
