const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');


// list all routes
//router.get('/transactionDetail/:transactionID', controller.transactionDetails);
router.get('/accounts', controller.accounts);
router.get('/transactions/:accountID', controller.transactions);
router.get('/accountDetail', controller.accountDetail);
//
router.post('/createTransaction', controller.createTransaction);






module.exports = router;