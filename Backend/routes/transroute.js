const express = require('express');
const transrouter = express.Router();
const controller = require('../controllers/controller');

transrouter.get('/transactionDetail/:transactionID', controller.transactionDetails);
transrouter.post('/transaction', controller.createTransaction);



module.exports = transrouter;