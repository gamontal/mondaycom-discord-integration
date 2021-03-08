const fetch = require('node-fetch');
const mondayService = require('../services/monday-service');

const getChannels = async (discordGuildId) => { //TODO: Change parameter to guildId instead of discordGuildId
  const channelsRes = await fetch(`https://discord.com/api/guilds/${discordGuildId}/channels`, {
    headers: { authorization: `Bot ${process.env.BOT_TOKEN}` }
  }); 

  const channels = await channelsRes.json();
  const textChannels = channels.find(channel => {
    return channel.type == 4 && channel.name == 'Text Channels';
  });

  const options = channels.reduce((chn, { id, name, parent_id }) => {
    if (parent_id == textChannels.id) {
      chn.push({ value: id, title: name });
    }

    return chn;
  }, []);

  return options;
};

const postMessage = async (shortLivedToken, messageType, inputFields) => {
  const { channel, userId, boardId, itemId, text, message } = inputFields;
  const accountSlug = await mondayService.getAccountSlug(shortLivedToken, boardId);
  const user = await mondayService.getUser(shortLivedToken, userId);
  const board = await mondayService.getBoard(shortLivedToken, boardId);
  const item = await mondayService.getItem(shortLivedToken, itemId);

  const channelId = channel.value;
  var channelMessageContent =
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
      channelMessageContent.content = message;
      break;
    case 'update':
      channelMessageContent.content = `${user.name} updated ${item.name} on ${board.name} board`;
      channelMessageContent.embed.title = 'Update:';
      channelMessageContent.embed.description = `${text}\n\n${channelMessageContent.embed.description}`
      break;
    default:
      break;
  }

  const sendMessage = await fetch(`https://discord.com/api/channels/${channelId}/messages`, {
    method: 'POST',
    body: JSON.stringify(channelMessageContent),
    headers: { 
      authorization: `Bot ${process.env.BOT_TOKEN}`,
      'content-type': 'application/json'
    }
  });
  
  return JSON.stringify(channelMessageContent);
};

module.exports = {
  getChannels,
  postMessage
};
