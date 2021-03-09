const router = require('express').Router();
const { authenticationMiddleware } = require('../middlewares/authentication');
const authController = require('../controllers/auth-controller');

router.get('/auth', authenticationMiddleware, authController.authorize);
router.get('/auth/integration/redirect', authController.integrationCallback);
router.get('/auth/callback/:userId', authController.sessionCallback);

module.exports = router;
