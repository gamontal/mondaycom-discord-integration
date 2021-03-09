const router = require('express').Router();
const { authenticationMiddleware } = require('../middlewares/authentication');
const mondayController = require('../controllers/monday-controller');

router.post('/monday/channel_list_options', authenticationMiddleware, mondayController.getChannelListOptions);
router.post('/monday/member_list_options', authenticationMiddleware, mondayController.getMemberListOptions);
router.post('/monday/post_message/:messageType', authenticationMiddleware, mondayController.postMessage);

module.exports = router;
