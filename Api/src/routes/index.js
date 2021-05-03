const { Router } = require('express');

const ClientRouter = require('./Client');
const AdminRouter = require('./Admin');

const router = Router();

router.use('/client', ClientRouter);
router.use('/admin', AdminRouter);


module.exports = router;