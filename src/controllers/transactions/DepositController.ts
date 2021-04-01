import { Request, Response } from 'express';

import models from '../../models';
const Deposit = models.Deposits;


const depositController = async (req: Request, res: Response) => {
    const data = req.body;

    const newDeposit = new Deposit({
        ...data
    })
    try {
        const modelResponse = await newDeposit.increaseBalance();
        if(typeof(modelResponse) === "string"){
            const message = "Unregistered user making a deposit.";
            throw message;
        }

        const saveDeposit = await newDeposit.save();
        res.status(201).json({
            message: 'Deposit was successful',
            status: "Success",
            data: saveDeposit
        })
    } catch (error) {
        res.status(400).json({
            message: `Deposit was unsuccessful.`,
            status: "Error",
            data: `${error}`
        })
    }
}

export default depositController;