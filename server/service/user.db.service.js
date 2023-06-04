import userSchema from "../model/user.schema.js";

/**
Inserts a new user into the database.
@param {Object} user - The user object to be inserted.
@returns {Promise} A promise that resolves when the user is successfully saved to the database.
*/
export const insertUser = async (user) => {
    // Create a new user
    const newUser = new userSchema(user);
    // Save the user to the database
    newUser.save()
        .then((user) => {
            console.log("User saved successfully:", user);
        })
        .catch((ex) => {
            console.error("Error saving user:", ex);
        });
}

/**
Retrieves users with the specified email domain from the database.
@param {string} domain - The email domain to search for.
@returns {Promise} A promise that resolves with an array of users matching the email domain.
*/
export const getUsersByDomain = async (domain) => {
    try {
        //creating the regular expression pattern using the provided domain
        const domainPattern = new RegExp(`@${domain}$`);
        return userSchema.find({ email: domainPattern }, { password: 0 })
    } catch (ex) {
        console.error("Error retrieving users:", ex);
        throw ex
    }
}