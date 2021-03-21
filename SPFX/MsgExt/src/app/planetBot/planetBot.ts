import {
  TeamsActivityHandler,
  TurnContext,
  MessageFactory,
  CardFactory, MessagingExtensionAction, MessagingExtensionActionResponse, MessagingExtensionQuery, MessagingExtensionResponse, MessagingExtensionAttachment
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

    protected handleTeamsMessagingExtensionQuery(context: TurnContext, query: MessagingExtensionQuery): Promise<MessagingExtensionResponse> {
      // get the search query
      let searchQuery = "";
      console.log('triggered')
      if (query && query.parameters && query.parameters[0].name === "searchKeyword" && query.parameters[0].value) {
        searchQuery = query.parameters[0].value.trim().toLowerCase();
      }
 console.log(searchQuery)
      // search results
      let queryResults: string
    
      switch (searchQuery) {
        case "inner":
          // get all planets inside asteroid belt
          queryResults = "interni"
          break;
        case "outer":
          // get all planets outside asteroid belt
          queryResults = 'esterni'
          break;
        default:
          // get the specified planet
          queryResults = searchQuery
      }
    
      const searchResultsCards: MessagingExtensionAttachment[] = [CardFactory.heroCard(queryResults, 'una prova', ['https://www.google.it/url?sa=i&url=https%3A%2F%2Fgadgets.ndtv.com%2Fapps%2Fnews%2Fmicrosoft-teams-increase-group-call-limit-250-rollout-mid-may-2223818&psig=AOvVaw08eq738fvFCARsfA77Dre0&ust=1616419606112000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCODZ2Le-we8CFQAAAAAdAAAAABAE'])];

      const response: MessagingExtensionResponse = {
        composeExtension: {
          type: "result",
          attachmentLayout: "list",
          attachments: searchResultsCards
        }
      } as MessagingExtensionResponse;
    
      return Promise.resolve(response);
    }

  }