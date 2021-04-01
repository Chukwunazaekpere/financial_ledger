import { Request, Response } from 'express';
import models from '../../models';
const Users = models.Users;


const registerConntroller = async (req:Request, res: Response) => {
    const { username } = req.body;
    
    const newUser = new Users({
        username,
    });
    try {
        const userExists = await Users.findOne({username});        
        if(userExists !== null){
            throw ("You're a registered user.")
        };

        const savedUser = await newUser.save();
        res.status(201).json({
            message: 'New user registered.',
            status: 'Successful',
            data: savedUser
        });
        savedUser.createAccount();
    } catch (error) {
        res.status(400).json({
            message: `Failed to register user. `,
            status: 'Error',
            data: `${error}`
        });
    };
}


export default registerConntroller;