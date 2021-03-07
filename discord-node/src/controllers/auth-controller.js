const { cache, cacheKeys } = require('../services/cache-service');
const authService = require('../services/auth-service');
const connectionModelService = require('../services/model-services/connection-model-service');

const authorize = async (req, res) => {
  const { userId, backToUrl } = req.session;
  const authorizationUrl = authService.getAuthorizationUrl(backToUrl);

  res.cookie('callbackUrl', `${cache.get(cacheKeys.SERVER_URL)}/auth/callback/${userId}`);

  return res.redirect(authorizationUrl);
};

const discordRedirect = async (req, res) => { 
  const { code, state } = req.query;
  const authorizationUrl = `${req.cookies.callbackUrl}?code=${code}&state=${state}`

  return res.redirect(authorizationUrl);
}

const callback = async (req, res) => {  
  const { userId } = req.params;
  const { code, state: backToUrl } = req.query;

  try {
    const auth = await authService.getUserAuth(code);
    const token = auth.access_token;
    const discordGuildId = auth.guild.id;

    await connectionModelService.createConnection({ token, userId, discordGuildId });

    return res.redirect(backToUrl);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
};

module.exports = {
  authorize,
  discordRedirect,
  callback
};
