import express from "express"
import {promises as fs} from "fs" 
import path from "path"
import { fileURLToPath } from 'url';
import {createUser, getAllUsers, getUserById, deleteUser, updateUser} from "../database/handler.js"

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

router.get("/", async (req, res) => {
    const users = await getAllUsers()
    res.status(200).send(users)
})

router.post("/", async(req, res) => {
    const {firstName, lastName, phoneNumber, birthday, image} = req.body
    try {
        const imagePath = path.join(path.dirname(__dirname), 'images', image)
        const imageData = await fs.readFile(imagePath)
        const user = await createUser({firstName: firstName, lastName: lastName, phoneNumber: phoneNumber, birthday: birthday, image: imageData})
        user.image = imagePath
        res.status(201).send(user)
    } catch (error) {
        if(error.name === "SequelizeValidationError"){
            let errorString = ""
            const errors = []
            error.errors.map(er => errors.push({"type": er.type, "msg": er.message}))
            errors.forEach(er => errorString += `\n${er.type} - ${er.msg}`)
            res.status(400).send(errorString)
        }
        else{
            res.status(500).send("Something went wrong in db")
        }
        console.log(error)
    }
})

router.get("/:id/image", async(req, res) => {
    const id = req.params.id
    try {
        const user = await getUserById(id)
        if(user === null)res.status(500).send("User with such id doesn't exist")
        else {
            res.setHeader("Content-Type", "image/jpg")
            res.status(200).send(user.image)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Something went wrong in db")
    }
})

router.get("/:id", async(req, res) => {
    const id = req.params.id
    try {
        const user = await getUserById(id)
        if(user === null)res.status(500).send("User with such id doesn't exist")
        else {
            const imageData = user.dataValues.image
            const imagePath = path.join(path.dirname(__dirname), "images", `user_${id}.jpg`)
            user.image = imagePath
            await fs.writeFile(imagePath, imageData)
            res.status(200).send(user)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Something went wrong in db")
    }
})

router.delete("/:id", async(req, res) => {
    const id = req.params.id
    try {
        const status = await deleteUser(id)
        console.log(status)
        if(status === 0)res.status(500).send("User with such id doesn't exist")
        else res.status(200).send(`Successfully deleted user with id - ${id}`)
    } catch (error) {
        console.log(error)
        res.status(500).send("Something went wrong in db")
    }
})

router.put("/:id", async(req, res) => {
    const id = req.params.id
    try {
        if(req.body.image !== undefined){
            console.log('in image chnage section')
            const imageData = await fs.readFile(path.join(path.dirname(__dirname), 'images', req.body.image))
            req.body.image = imageData
        }
        const status = await updateUser(id, req.body)
        if(status === 0)res.status(500).send("User with such id doesn't exist")
        res.status(200).send(`Successfully updated user with id - ${id}`)
    } catch (error) {
        console.log(error)
        if(error.name === "SequelizeValidationError"){
            let errorString = ""
            const errors = []
            error.errors.map(er => errors.push({"type": er.type, "msg": er.message}))
            errors.forEach(er => errorString += `\n${er.type} - ${er.msg}`)
            res.status(400).send(errorString)
        }
        else{
            res.status(500).send("Something went wrong in db")
        }   
    }
})

export default router