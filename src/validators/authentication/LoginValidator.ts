import Joi from "joi";
import database from "../../models/index.js";
const Users = database.Users;


const loginValidator = async (requestBody: object) => {
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    })
    const {error, value} = loginSchema.validate(requestBody)
    if(error){
        return `Login error: ${error.details[0].message}`
    }

    const { email } = value;
    const validUser = await Users.findOne({ email })
    if(!validUser.email){
        return "Login error: This email address does not exist."
    }

    // If all is okay with the login - credentials
    return validUser;
}

export default loginValidator;