const express = require("express")
const router = express.Router()
const {createAddress, getAllAddresses, getAddressById, deleteAddress, updateAddress} = require("../database/handler")

router.get("/", async (req, res) => {
    const addresses = await getAllAddresses()
    res.send(addresses)
})

router.post("/", async(req, res) => {
    const {country, state, city, zipCode, address, userId} = req.body
    try {
        const new_address = await createAddress({country: country, state: state, city: city, address: address, userId: userId, zipCode: zipCode})
        res.status(201).send(new_address)
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

router.get("/:id", async(req, res) => {
    const id = req.params.id
    try {
        const address = await getAddressById(id)
        if(address === null)res.status(500).send("Address with such id doesn't exist")
        else res.status(200).send(address)
    } catch (error) {
        console.log(error)
        res.status(500).send("Something went wrong in db")
    }
})

router.delete("/:id", async(req, res) => {
    const id = req.params.id
    try {
        const status = await deleteAddress(id)
        if(status === 0)res.status(500).send("Address with such id doesn't exist")
        else res.status(200).send(`Successfully deleted address with id - ${id}`)
    } catch (error) {
        console.log(error)
        res.status(500).send("Something went wrong in db")
    }
})

router.put("/:id", async(req, res) => {
    const id = req.params.id
    try {
        const status = await updateAddress(id, req.body)
        if(status === 0)res.status(500).send("Address with such id doesn't exist")
        else res.status(200).send(`Successfully updated address with id - ${id}`)
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

module.exports = router