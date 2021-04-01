'use strict';
import { AccountFactory, IAccountShema, IAccountModelInstance } from './trannsactions/AccountModel';
import { WithdrawalFactory, IWithdrawalSchema, IWithdrawalModel } from './trannsactions/WithdrawalModel';
import { DepositFactory, IDepositSchema, IDepositModelInstance } from './trannsactions/DepositModel';
import { TransferFactory, ITransferSchema, ITransferModelInstance } from './trannsactions/TransferModel';

//=============== auth model ===========================
import { IUsersModelInstance, IUsersSchema, UserFactory } from './authentication/Users';
//========================================================
import Sequelize, { DataTypes } from 'sequelize';

interface DbInterface {
  Account: Sequelize.Model<IAccountModelInstance, IAccountShema>
  Withdrawals: Sequelize.Model<IWithdrawalSchema, IWithdrawalModel>
  Deposits: Sequelize.Model<IDepositModelInstance, IDepositSchema>
  Users: Sequelize.Model<IUsersModelInstance, IUsersSchema>
  Transfers: Sequelize.Model<ITransferModelInstance, ITransferSchema>
}



const models = {
    Account: 
    Withdrawals: 
    Deposits: 
    Users: 
    Transfers: TransferFactory(Sequelize)
}

export default models;



// const basename = _basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.js')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(join(__dirname, file))(sequelize, DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;
