// Importing the mongoose module and the database connection from the 'mongoose.js' file
import db from "../../config/mongoose.js";
import { generateHash } from "../helper/hash.js";
import { generateToken } from "../helper/token.js";

// Destructuring the 'mongoose' object from the 'db' module
let { mongoose } = db;

// Defining the user schema
let user = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        
    },
}, {
    versionKey: false, // Disabling the '__v' field in the documents
    timestamps: { updatedAt: "updatedTime", createdAt: "createdTime" }, // Adding 'updatedAt' and 'createdAt' fields to track document timestamps
});


// Pre-save function to generate password hash and token
user.pre("save", async function (next) {
    try {
        const hashedPassword = await generateHash(this.password)
        this.password = hashedPassword;
    } catch (error) {
        return next(error);
    }
    // Generate a token using JWT with email and name
    try {
        const tokenPayload = { email: this.email, name: this.name };
        const token = await generateToken(tokenPayload)
        this.token = token;
    } catch (error) {
        return next(error);
    }
    next();
});


// Creating a new user schema model using the user schema
let userSchema = mongoose.model('user', user);

export default userSchema;