import db from "./config/mongoose.js"
import { getUsersByDomain, insertUser } from "./server/service/user.db.service.js"

const user = {
    email: "john.doe@example.com",
    name: "John Doe",
    password: "password123",
}

const dbOperations = async () => {
    await db.dbConnect()
    await insertUser(user)
    let domainUsers = await getUsersByDomain('example.com')
    console.log(domainUsers)
}


dbOperations()
