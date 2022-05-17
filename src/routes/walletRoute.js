const walletRoute = require('express').Router();
const authantication = require('../middleware/authanitcation');
const checkRole = require('./../middleware/checkAdmin');
const walletReg = require('./../controller/walletRegister');
const walletActivate = require('./../controller/walletActivate');
const addMoneyInWallet = require('../controller/addMoneyInWallet');
const sendMoney = require('../controller/sendMoney');
const userTransactionHistory = require('../controller/userTransactionHistory');
const checkBalance = require('../controller/checkBalance');
const fraudTransactionDetail = require('../controller/fraudTransaction');
const checkFraudTransaction = require('../controller/checkFraudTransaction');


walletRoute.post('/regwallet',authantication.authantication,walletReg.walletReg);
walletRoute.post('/walletactivate',authantication.authantication,walletActivate.walletActivate);
walletRoute.post('/addmoneyinwallet',authantication.authantication,addMoneyInWallet.addMoneyInWallet);
walletRoute.post('/sendmoney',authantication.authantication,sendMoney.sendMoney);
walletRoute.get('/transactionhistory',authantication.authantication,userTransactionHistory.userTransactionHistory);
walletRoute.get('/checkbalance',authantication.authantication,checkBalance.checkBalance);
walletRoute.post('/fraudtransaction',authantication.authantication,fraudTransactionDetail.fraudTransactionDetail);
walletRoute.post('/checkfraudtransaction',authantication.authantication,checkRole.checkRole,checkFraudTransaction.checkFraudTransaction)




module.exports = walletRoute