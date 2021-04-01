import { Request, Response } from 'express';
import models from '../../models';
const Account = models.Account;


const usersAccountController = async (req:Request, res: Response) => {
    try {
        const users = await Account.find();        

        res.status(200).json({
            message: 'All users.',
            status: 'Successful',
            data: users
        });
    } catch (error) {
        res.status(400).json({
            message: `${error}`,
            status: 'Error',
            data: null
        });
    };
}


export default usersAccountController;