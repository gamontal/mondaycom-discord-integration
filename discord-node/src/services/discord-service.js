const fetch = require('node-fetch');

const getChannels = async (discordGuildId) => {
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

const postMessage = async (channelId, text) => {
  const message =
  {
    tts: false,
    embed: {
      title: 'Update', //TODO: Make this value dynamic
      description: text //TODO: Make this value dynamic
    },
    content: '' //TODO: Make this value dynamic
  };

  await fetch(`https://discord.com/api/channels/${channelId}/messages`, {
    method: 'POST',
    body: JSON.stringify(message),
    headers: { 
      authorization: `Bot ${process.env.BOT_TOKEN}`,
      'content-type': 'application/json'
    }
  }); 

  return JSON.stringify(message);
};

module.exports = {
  getChannels,
  postMessage
};
