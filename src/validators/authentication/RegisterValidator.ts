import Joi from "joi";
import database from "../../models/index.js";
const Users = database.Users;


const registerValidator = async (requestBody: object) => {
    // Validate registration fields
    const registerSchema = Joi.object({
        firstname: Joi.string().min(3).max(25).required(),
        lastname: Joi.string().min(3).max(25).required(),
        email: Joi.string().required().email(), 
        phone: Joi.string().max(11).min(11).required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().min(6).required(),
    })

    const {error, value} = registerSchema.validate(requestBody)
    if( error ){
        return `Registration error: ${error.details[0].message}`
    }
    
    // Check if email already exists in database
    const { email, phone, confirmPassword, password } = value;
    try {
        const user = await Users.findOne({ email })
        if(user){
            return "There's an existing account with this email address."
        }
        // also, check if password and confirm - password are the same. 
        else if(confirmPassword !== password){
            return "Password discrepancy. Both passwords must match."
        }
    } catch (error) {
        return error
    };
    
    // if no error was encountered, return "value" 
    return value;  // the accepted data from "Joi"
}


export default registerValidator;