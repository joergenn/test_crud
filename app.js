import express from "express"
import 'dotenv/config'
import addressesRouter from "./routes/addresses.js"
import usersRouter from "./routes/users.js"
import {sequelize} from "./database/connection.js"

const app = express()
const port = process.env.PORT

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.use("/users", usersRouter)

app.use("/addresses", addressesRouter)

const start = async() =>{
    try {
        app.listen(port)
        await sequelize.authenticate()
        await sequelize.sync()
        console.log(`Connection open on ${port} port`)
    } catch (error) {
        console.log("Error happend while connectiong: \n", error);
    }
}

start()

