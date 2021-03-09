const fetch = require('node-fetch');
const mondayService = require('../services/monday-service');

const getChannels = async (botToken, guildId) => {
  const channelsResponse = await fetch(`https://discord.com/api/guilds/${guildId}/channels`, {
    headers: { authorization: `Bot ${botToken}` }
  }); 

  const channels = await channelsResponse.json();
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

const getMembers = async (botToken, guildId) => { //TODO: Need to add request pagination
  const membersResponse = await fetch(`https://discord.com/api/guilds/${guildId}/members?limit=1000`, {
    headers: { authorization: `Bot ${botToken}` }
  }); 

  const members = await membersResponse.json();

  const options = members.reduce((mb, { user }) => {
    if (user.id != '817599111293173800') {
      mb.push({ value: user.id, title: user.username });
    }

    return mb;
  }, []);

  return options;
};

const postMessage = async (botToken, messageContent, channelId, memberId) => {
  if (memberId) {
    const userChannelResponse = await fetch(`https://discord.com/api/users/@me/channels`, {
      method: 'POST',
      body: JSON.stringify({ recipient_id: memberId }),
      headers: { 
        authorization: `Bot ${botToken}`,
        'content-type': 'application/json'
      }
    });

    const userChannel = await userChannelResponse.json();
    channelId = userChannel.id;
  }

  const postMessageResponse = await fetch(`https://discord.com/api/channels/${channelId}/messages`, {
    method: 'POST',
    body: JSON.stringify(messageContent),
    headers: { 
      authorization: `Bot ${botToken}`,
      'content-type': 'application/json'
    }
  });

  const postMessage = await postMessageResponse.json();
  return postMessage;
};

module.exports = {
  getChannels,
  getMembers,
  postMessage
};
