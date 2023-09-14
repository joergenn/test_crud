const express = require("express")
const sequelize = require("./database/connection")
const models = require("./database/models")
const addressesRouter = require("./routes/addresses")
const usersRouter = require("./routes/users")

const app = express()
const port = 3000

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

