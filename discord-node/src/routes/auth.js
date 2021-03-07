const router = require('express').Router();
const { authenticationMiddleware } = require('../middlewares/authentication');
const authController = require('../controllers/auth-controller');

router.get('/auth', authenticationMiddleware, authController.authorize);
router.get('/auth/discord/redirect', authController.discordRedirect);
router.get('/auth/callback/:userId', authController.callback);

module.exports = router;
