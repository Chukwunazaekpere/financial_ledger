import { Sequelize, DataTypes, Model } from 'sequelize';



let Deposit;
export interface IDepositSchema {
    id: number,
    firstname: string,
    lastname: string,
    amount: number, 
    transactionId: string
}

export interface IDepositModelInstance extends Model<IDepositSchema>, IDepositSchema {
    increaseBalance(): Promise<IDepositSchema>,
}


export const DepositFactory = (sequelize: Sequelize) => {
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
            required: true
        },
        transactionId: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
    }

    const Deposit = sequelize.define<IDepositModelInstance, IDepositSchema>("Deposit", attributes);
    return Deposit;
};


const increaseBalance = async function(this: IDepositSchema) {
    const firstname = this.firstname;
    try {
        const user = await User.findOne({firstname});
        if(user === null){
            const message = "Unregistered user attempting to make a deposit.";
            throw message;
        }
        const userAccount = await Account.findOne({user: user._id}); 
        console.log("userAccount: ", userAccount);
        
        const previousBalance = Number(userAccount?.balance);
        const depositedAmount = this.amount;
        const newBalance = previousBalance + depositedAmount;
        userAccount!['balance'] = newBalance;
        await userAccount!.save();
        
        return true;
    } catch (error) {
        return error;
    }

}

