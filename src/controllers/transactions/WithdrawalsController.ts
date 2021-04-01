import { Request, Response } from 'express';

import models from '../../models';
const Withdrawal = models.Withdrawals;


const withdrawalController = async (req: Request, res: Response) => {
    const data = req.body;

    const newWithdrawal = new Withdrawal({
        ...data
    })
    try {
        const modelResponse = await newWithdrawal.decreaseBalance();
        if(typeof(modelResponse) === "string"){
            const message = `${modelResponse}`;
            throw message;
        }

        const saveDeposit = await newWithdrawal.save();
        res.status(201).json({
            message: 'Withdrawal was successful.',
            status: "Success",
            data: saveDeposit
        })
    } catch (error) {
        res.status(400).json({
            message: `Withdrawal was unsuccessful.`,
            status: "Error",
            data: `${error}`
        })
    }
}

export default withdrawalController;