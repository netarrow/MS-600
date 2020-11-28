using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using Microsoft.Identity.Client;
using Microsoft.Graph;
using Microsoft.Extensions.Configuration;
using Helpers;

namespace Deamon.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GetEmailsController : ControllerBase
    {
        private readonly ILogger<GetEmailsController> _logger;

        private static IAuthenticationProvider CreateAuthorizationProvider()
        {
            var tenantId = "39076c6b-ee10-466c-b264-14a5350b127e";
            var clientId = "c7c6f6ca-091d-4d29-8c17-db85228b1a66";
            var clientSecret = "g15tAZt38L6x6qRdzJ_7Rl9U1.pF-_aDYN";
            var authority = "https://login.microsoftonline.com/39076c6b-ee10-466c-b264-14a5350b127e/v2.0";

            List<string> scopes = new List<string>();
            scopes.Add("https://graph.microsoft.com/.default");

            var cca = ConfidentialClientApplicationBuilder.Create(clientId)
                                                    .WithAuthority(authority)
                                                    .WithClientSecret(clientSecret)
                                                    .Build();
            return MsalAuthenticationProvider.GetInstance(cca, scopes.ToArray());
        }

        private static GraphServiceClient GetAuthenticatedGraphClient()
        {
            var authenticationProvider = CreateAuthorizationProvider();
            return new GraphServiceClient(authenticationProvider);
        }

        public GetEmailsController(ILogger<GetEmailsController> logger)
        {
            _logger = logger;
        }

        [HttpGet()]
        [Route("get")]
        public IEnumerable<string> Get()
        {
            var client = GetAuthenticatedGraphClient();
            var requestUserEmail = client.Users["dd2b3432-64de-42dd-bd39-7385e9b5d023"].Messages.Request();
            var results = requestUserEmail.GetAsync().Result;
            List<string> msg = new List<string>();
            foreach (var message in results)
            {
                msg.Add(message.Subject);
            }

            return msg;
        }
    }
}


