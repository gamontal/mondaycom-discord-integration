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

async function postMessage(req, res) { //TODO: Create a route for each message type, instead of a global postMessage function
  const { inputFields } = req.body.payload;

  try {
    const { channel, text } = inputFields;
    await discordService.postMessage(channel.value, text);

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
