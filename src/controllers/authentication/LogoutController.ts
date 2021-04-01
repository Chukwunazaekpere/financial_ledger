import { Request, Response } from "express";
import database from "../../models/index.js";
const Users = database.Users;

import loginValidator  from "../../validators/authentication/LoginValidator";

import bcrypt from "bcrypt";


const logoutController = async (req: Request, res: Response) => {
    const validatedLoginRequest = await loginValidator(req.body)    

    if(typeof(validatedLoginRequest) == "string" ){
        return res.status(400).json({message: validatedLoginRequest,
                                        status: "Error",
                                        data: null 
                                    })
    }
    const { email } = validatedLoginRequest;
    try {
        const user = await Users.findOne({ email });
        if(user){
            const similarPassword = await bcrypt.compare(req.body.password, user.password);
            if(similarPassword){
                return res.status(200).json({message: "Found user",
                                                status: "Success",
                                                data: validatedLoginRequest
                                            })
            }
        }
        throw "Email or password descripancy.";
    } catch (error) {
        return res.status(400).json({message: "User not found",
                                        status: "Error",
                                        data: `${error}`
                                    })
    }

}

export default logoutController;