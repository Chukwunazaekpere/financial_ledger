import { Sequelize, DataTypes, Model } from 'sequelize';


export interface IWithdrawalSchema  {
    username: string,
    amount: number, 
    transactionId: string
}

export interface IWithdrawalModel extends Model<IWithdrawalSchema>, IWithdrawalSchema {
    decreaseBalance(): number
}

export const WithdrawalFactory = (sequelize: Sequelize) => {
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
    };

    const Withdrawal = sequelize.define("Withdrawal", attributes);
    return Withdrawal;
    
};


const decreaseBalance = async function(this: IWithdrawalSchema) {
    const username = this.username;
    try {
        const user = await User.findOne({username});
        if(user === null){
            const message = "Unregistered user attempting to make a withdrawal."
            throw message;
        }
        const userAccount = await Account.findOne({user: user._id}); 
        console.log("userAccount: ", userAccount);
        
        const previousBalance = Number(userAccount!.balance);
        const newBalance = previousBalance - this.amount;
        userAccount!['balance'] = newBalance;
        await userAccount!.save();
        
        return true;
    } catch (error) {
        return error;
    }

}

