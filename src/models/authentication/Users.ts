import pg from 'pg';
import { Sequelize, DataTypes, Model } from 'sequelize';


export interface IUsersSchema {
    id?: number,
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
}

export interface IUsersModelInstance extends Model<IUsersSchema>, IUsersSchema {
    id?: number,
    createAccount(): void
}

let User;
export const UserFactory = (sequelize: Sequelize) => {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        created_At: {
            type: DataTypes.DATE,
            allowNull: false,
            default: new Date()
        },
    };
    
    User = sequelize.define<IUsersModelInstance, IUsersSchema>("User", attributes);
    
};
  
export default User;