
using Microsoft.Identity.Client;
using Microsoft.Graph;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Threading.Tasks;
using System.Threading;
using System.Net.Http.Headers;

namespace Helpers
{
    public class AuthHandler : DelegatingHandler
    {
        private IAuthenticationProvider _authenticationProvider;

        public AuthHandler(IAuthenticationProvider authenticationProvider, HttpMessageHandler innerHandler)
        {
            InnerHandler = innerHandler;
            _authenticationProvider = authenticationProvider;
        }

        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            await _authenticationProvider.AuthenticateRequestAsync(request);
            return await base.SendAsync(request, cancellationToken);
        }
    }

    public class MsalAuthenticationProvider : IAuthenticationProvider
    {
        private static MsalAuthenticationProvider _singleton;
        private IConfidentialClientApplication _application;
        private string[] _scopes;

        private MsalAuthenticationProvider(IConfidentialClientApplication application, string[] scopes)
        {
            _application = application;
            _scopes = scopes;
        }

        public static MsalAuthenticationProvider GetInstance(IConfidentialClientApplication application, string[] scopes)
        {
            if (_singleton == null)
            {
                _singleton = new MsalAuthenticationProvider(application, scopes);
            }

            return _singleton;
        }

        public async Task AuthenticateRequestAsync(HttpRequestMessage request)
        {
            request.Headers.Authorization = new AuthenticationHeaderValue("bearer", await GetTokenAsync());
        }

        public async Task<string> GetTokenAsync()
        {
            AuthenticationResult result = null;

            try
            {
                result = await _application.AcquireTokenForClient(_scopes).ExecuteAsync();
            }
            catch (MsalServiceException) { }

            return result.AccessToken;
        }
    }
}