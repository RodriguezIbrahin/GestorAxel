const { Router } = require('express');

const scoreRouter = require('./score');

const router = Router();

router.use('/score', scoreRouter);


module.exports = router;