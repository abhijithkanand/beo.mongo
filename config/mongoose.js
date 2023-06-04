import mongoose from 'mongoose';
import dotenv from 'dotenv'
// require and configure dotenv, will load vars in .env in PROCESS.ENV
dotenv.config()

const dbConnect = async () => {
    mongoose.set('strictQuery', false)
    mongoose.Promise = global.Promise;
    mongoose.connect(`${process.env.MONGO_URL}`, {
        useNewUrlParser: true,
    });
    mongoose.connection.on('connected', async () => {
        console.log(`DB Connection Established`)
    });
    mongoose.connection.on('error', () => {
        console.log(`DB Connection Error`)
    });
    mongoose.connection.on('disconnected', (err) => {
        console.log(`DB Connection Failed`)
    });

}


let db = {
    mongoose: mongoose,
    dbConnect,
}

export default db




