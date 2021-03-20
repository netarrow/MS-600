import {
  TeamsActivityHandler,
  TurnContext,
  MessageFactory,
  CardFactory, MessagingExtensionAction, MessagingExtensionActionResponse, MessagingExtensionAttachment
} from "botbuilder";
 
  
  import * as Util from "util";
  const TextEncoder = Util.TextEncoder;
  
  import * as debug from "debug";
  const log = debug("msteams");
  
  export class PlanetBot extends TeamsActivityHandler {
    constructor() {
      super();
    }

    protected handleTeamsMessagingExtensionFetchTask(context: TurnContext, action: MessagingExtensionAction): Promise<MessagingExtensionActionResponse> {
      // load planets & sort them by their order from the sun

      const adaptiveCardSource: any = require("./card.json");

      const adaptiveCard = CardFactory.adaptiveCard(adaptiveCardSource);

      const response: MessagingExtensionActionResponse = {
        task: {
          type: "continue",
          value: {
            card: adaptiveCard,
            title: "Planet Selector",
            height: 150,
            width: 500
          }
        }
      } as MessagingExtensionActionResponse;
    
      return Promise.resolve(response);
    }

    protected handleTeamsMessagingExtensionSubmitAction(context: TurnContext, action: MessagingExtensionAction): Promise<MessagingExtensionActionResponse> {
      switch (action.commandId) {
        case "planetExpanderAction":
          // generate the response

          var adaptiveCard = CardFactory.adaptiveCard(
            {
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard",
            "version": "1.0",
            "body": [
              {
                "id": "cardHeader",
                "type": "Container",
                "items": [
                  {
                    "id": "planetName",
                    "type": "TextBlock",
                    "weight": "bolder",
                    "size": "medium",
                    "text": action.data.planetSelector == 1 ? "Mercury" : "Venus" // todo get from json
                  }
                ]
              }]
          });

          return Promise.resolve({
            composeExtension: {
              type: "result",
              attachmentLayout: "list",
              attachments: [adaptiveCard]
            }
          } as MessagingExtensionActionResponse);
          break;
        default:
          throw new Error("NotImplemented");
      }
    }

  }