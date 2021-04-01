import { Sequelize, DataTypes, Model } from 'sequelize';


export interface IAccountShema {
    id: number,
    user: string,
    balance: number,
    transfer: number,
    availableWithdrawal: number,
    createdAt: number
};

export interface IAccountModelInstance extends Model<IAccountShema>, IAccountShema{
    balance: number,  
    getBalance(): Promise<IAccountShema>;
    setInterest(): Promise<IAccountShema>
}

export const AccountFactory = (sequelize: Sequelize) => {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user: {
            type:  DataTypes.INTEGER,
            ref: "Users"
        },
        balance: {
            type: DataTypes.INTEGER,
            allownull: false
        },
        transfer: {
            type: DataTypes.INTEGER,
            allownull: false
        },
        availableWithdrawal: {
            type: DataTypes.INTEGER,
            allownull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            default: new Date(),
            allownull: false
        }
    }

    const Account = sequelize.define<IAccountModelInstance, IAccountShema>("Account", attributes);
    return Account;
};


const getBalance = async function(this: IAccountShema){
    return this.balance;
};


