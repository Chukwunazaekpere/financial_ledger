import { Sequelize, DataTypes, Model } from 'sequelize';

export interface ITransferSchema {
    id: number, 
    firstname: string,
    lastname: string,
    amount: number, 
    transactionId: string
}

export interface ITransferModelInstance extends Model<ITransferSchema>, ITransferSchema {
    recordTransfer(): number
}

export const TransferFactory = (sequelize: Sequelize) => {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        transactionId: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
    }

    const Transfer = sequelize.define<ITransferModelInstance, ITransferSchema>("Transfer", attributes);
    return Transfer;
};


const recordTransfer = async function(this: ITransferSchema) {
    const username = this.lastname;
    try {
        const user = await User.findOne({username});
        if(user === null){
            const message = "Unregistered user attempting to invest."
            throw message
        }
        const userAccount = await Account.findOne({user: user._id}); 
        console.log("userAccount: ", userAccount);
        
        const investedAmount = this.amount;
        const previousBalance = Number(userAccount?.balance);
        if(previousBalance === 0){
            throw "Insufficient funds."
        }
        const newBalance = previousBalance - investedAmount;
        
        const previousInvestment = Number(userAccount?.investment);
        const newInvestment = previousInvestment + investedAmount;

        userAccount!['balance'] = newBalance;
        userAccount!['investment'] = newInvestment;
        await userAccount!.save();
        
        return true;
    } catch (error) {
        return error;
    }

}

