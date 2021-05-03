const { Router } = require('express');

const ClientRouter = require('./Client');

const router = Router();

router.use('/client', ClientRouter);


module.exports = router;