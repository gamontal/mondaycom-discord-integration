const connectionModelService = require('../services/model-services/connection-model-service');
const discordService = require('../services/discord-service');
const mondayService = require('../services/monday-service');

const botToken = process.env.DISCORD_BOT_TOKEN;

async function getChannelListOptions(req, res) {
  const { userId } = req.session;

  try {
    const { guildId } = await connectionModelService.getConnectionByUserId(userId);

    const options = await discordService.getChannels(botToken, guildId);
    return res.status(200).send(options);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
}

async function getMemberListOptions(req, res) {
  const { userId } = req.session;

  try {
    const { guildId } = await connectionModelService.getConnectionByUserId(userId);

    const options = await discordService.getMembers(botToken, guildId);
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

  try {
    const { channel, member, userId, boardId, itemId, text, message } = inputFields;
    const accountSlug = await mondayService.getAccountSlug(shortLivedToken, boardId);
    const user = await mondayService.getUser(shortLivedToken, userId);
    const board = await mondayService.getBoard(shortLivedToken, boardId);
    var pulse = await mondayService.getItem(shortLivedToken, itemId);
  
    pulse.column_values.forEach(function(column) {
      pulse[column.id] = column.text;
    });
  
    pulse.group = pulse.group.title;
  
    var channelId = (channel === undefined) ? undefined : channel.value;
    const memberId = (member === undefined) ? undefined : member.value;
  
    var messageContent =
    {
      tts: false,
      content: '',
      embed: {
        title: '',
        description: `[View the pulse on monday.com](https://${accountSlug}.monday.com/boards/${boardId}/pulses/${itemId}?)`
      }
    };
  
    switch(messageType) {
      case 'notify':
        try {
          messageContent.content = eval('`'+message.split('{').join('\${')+'`');
        } catch {}
        break;
      case 'update':
        messageContent.content = `${user.name} updated ${pulse.name} on ${board.name} board`;
        messageContent.embed.title = 'Update:';
        messageContent.embed.description = `${text}\n\n${messageContent.embed.description}`
        break;
      default:
        break;
    }
  
    await discordService.postMessage(botToken, messageContent, channelId, memberId);
    return res.status(200).send();
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
}

module.exports = {
  getChannelListOptions,
  getMemberListOptions,
  postMessage
};
