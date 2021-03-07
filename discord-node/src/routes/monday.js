const router = require('express').Router();
const { authenticationMiddleware } = require('../middlewares/authentication');
const discordMessage = require('../controllers/discord-controller');

router.post('/monday/discord_channel_get_remote_list_options', authenticationMiddleware, discordMessage.getChannelListOptions);
router.post('/monday/discord_channel_post_message', authenticationMiddleware, discordMessage.postMessage);

module.exports = router;
