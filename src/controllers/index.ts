
//======================= authentication imports ====================
import registerController from './authentication/RegisterController';
import loginController from './authentication/LoginController';
import logoutController from './authentication/LogoutController';

//====================== transaction inports ========================
import accountController from './transactions/AccountControllers';
import depositController from './transactions/DepositController';
import withdrawalController from './transactions/WithdrawalsController';
import transferController from './transactions/TransferController';


const controllers = {
    //========= transaction =========
    accountController,
    depositController,
    withdrawalController,
    transferController,
    //========== auth =================
    registerController,
    loginController,
    logoutController,
}

export default controllers;