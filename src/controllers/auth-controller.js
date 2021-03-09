const { cache, cacheKeys } = require('../services/cache-service');
const authService = require('../services/auth-service');
const connectionModelService = require('../services/model-services/connection-model-service');

// Authorize the integration application
const authorize = async (req, res) => {
  const { userId, backToUrl } = req.session;
  const authorizationUrl = authService.getAuthorizationUrl(backToUrl);

  // Store the user session callback URL in a cookie for later use
  res.cookie('callbackUrl', `${cache.get(cacheKeys.SERVER_URL)}/auth/callback/${userId}`);

  return res.redirect(authorizationUrl);
};

// Redirect the user back to the site after successfully authorizing the integration application
const integrationCallback = async (req, res) => { 
  const { code, state } = req.query;
  const authorizationUrl = `${req.cookies.callbackUrl}?code=${code}&state=${state}`

  return res.redirect(authorizationUrl);
}

// Redirect the user back to the session
const sessionCallback = async (req, res) => {  
  const { userId } = req.params;
  const { code, state: backToUrl } = req.query;

  try {
    const auth = await authService.getUserAuth(code);
    const token = auth.access_token;
    const guildId = auth.guild.id;

    await connectionModelService.createConnection({ token, userId, guildId });

    return res.redirect(backToUrl);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
};

module.exports = {
  authorize,
  integrationCallback,
  sessionCallback
};
