const connectionModelService = require('../services/model-services/connection-model-service');
const discordService = require('../services/discord-service');

async function getChannelListOptions(req, res) {
  const { userId } = req.session;

  try {
    const { discordGuildId } = await connectionModelService.getConnectionByUserId(userId);

    const options = await discordService.getChannels(discordGuildId);
    return res.status(200).send(options);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
}

async function postMessage(req, res) {
  const { shortLivedToken } = req.session;
  const { messageType } = req.params;
  const { inputFields } = req.body.payload;

  console.log(req.body.payload) //TODO: remove

  try {
    await discordService.postMessage(shortLivedToken, messageType, inputFields);
    return res.status(200).send();
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
}

module.exports = {
  getChannelListOptions,
  postMessage
};
