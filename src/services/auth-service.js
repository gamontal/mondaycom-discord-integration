const { AuthorizationCode } = require('simple-oauth2');
const { cache, cacheKeys } = require('./cache-service');

const getAuthorizationUrl = (state) => {
  const client = getClient();

  const authorizationUrl = client.authorizeURL({
    redirect_uri: getRedirectUri(),
    permissions: 3072, // Bot permission to List Channels and Send Messages to Discord
    scope: 'bot',
    state
  });

  return authorizationUrl;
};

const getUserAuth = async (code) => {
  const client = getClient();
  const response = await client.getToken({ code, redirect_uri: getRedirectUri() });

  return response.token;
};

const getClient = () => {
  return new AuthorizationCode({
    client: {
      id: process.env.DISCORD_CLIENT_ID,
      secret: process.env.DISCORD_CLIENT_SECRET
    },
    auth: {
      tokenHost: process.env.TOKEN_HOST,
      tokenPath: process.env.TOKEN_PATH,
      authorizePath: process.env.AUTHORIZE_PATH
    }
  });
};

const getRedirectUri = () => {
  return `${process.env.SERVER_URL}/auth/integration/redirect`;
};

module.exports = { getAuthorizationUrl, getUserAuth };
