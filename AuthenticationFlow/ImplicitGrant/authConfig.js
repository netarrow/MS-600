const msalConfig = {
    auth: {
      clientId: 'a92a330d-dd49-494e-a793-4292eb10de29',
      authority: 'https://login.microsoftonline.com/39076c6b-ee10-466c-b264-14a5350b127e',
       redirectURI: 'http://localhost:3007/'
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
  };

  // Add here scopes for id token to be used at MS Identity Platform endpoints.
  const loginRequest = {
    scopes: ["openid", "profile", "User.Read"]
  };

  // Add here scopes for access token to be used at MS Graph API endpoints.
  const tokenRequest = {
    scopes: ["Mail.Read"]
  };