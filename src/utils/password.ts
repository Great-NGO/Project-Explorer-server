require('dotenv').config();
import bcrypt from "bcryptjs";


/* Generate Password Salt and hash */
const encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(13);
    return await bcrypt.hash(password, salt);
}

/* Compare Password */
const comparePassword = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword)
}



export {
    encryptPassword,
    comparePassword
}
