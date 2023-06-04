import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
// require and configure dotenv, will load vars in .env in PROCESS.ENV
dotenv.config()

const secret = process.env.JWT_SECRET

/**
  * @property {Obj} @type {string}  details to attach with th toekn
  * @return {token} @type {string}  token string
  */
export const generateToken = async (Obj) => {
    let token = jwt.sign(Obj, secret)
    return token
}

/**
* @property {token} @type {string} token string
* @return {Obj} @type {string}  details to attach with th toekn 
*/
export const validateToken = async (token) => {
    try {
        let decoded = jwt.verify(token, secret)
        return decoded
    } catch (ex) {
        throw ex
    }
}