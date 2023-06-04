import bcrypt from 'bcrypt'

/**
*  hash an string
* @property {value} @type {string} - The vale want to hash.
* @returns {hash} @type {string} - Retrun an hash value of the inputed value
*/
export const generateHash = async (value) => {
    try {
        let salt = await bcrypt.genSalt(10)
        let hash = await bcrypt.hash(value, salt)
        return hash
    } catch (ex) {
        throw ex
    }
}

/**
 * @property {value} @type {string} values to compare
 * @property {hashValue} @type {string} hash value to compare
 */
export const compareHash = async (value, hashValue) => {
    try {
        return await bcrypt.compare(value, hashValue)
    } catch (ex) {
        throw ex
    }
}