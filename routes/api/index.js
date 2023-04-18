const router = require('express').Router();
const userRoute = require('./userRoutes');
const thoughtRoute = require('./thoughtRoutes');

router.use('./userRoutes.js', userRoute);
router.use('./thoughtRoutes.js', thoughtRoute);

module.exports = router; 