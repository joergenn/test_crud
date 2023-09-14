const sequelize = require('./connection')
const models = require('./models')

const getAllUsers = async() => {
    let users = await models.User.findAll()
    users = users.map(user => {
        const {image: image, ...rest} = user.dataValues
        return rest
    })
    console.log(users)
    return users
}

const getAllAddresses = async() => {
    const addresses = await models.Address.findAll()
    return addresses
}

const getUserById = async(id) => {
    const user = await models.User.findByPk(id)
    return user
}

const getAddressById = async(id) => {
    const address = await models.Address.findByPk(id)
    return address
}

const createUser= async(body) => {
    console.log(body)
    const user = await models.User.create(body)
    return user
}

const createAddress = async(body) => {
    console.log(body)
    const address = await models.Address.create(body)
    return address
}

const deleteUser = async(id) => {
    const status = await models.User.destroy({
        where: {
            id: id
        }
    })
    return status
}

const deleteAddress = async(id) => {
    const status = await models.Address.destroy({
        where: {
            id: id
        }
    })
    return status
}

const updateUser = async(id, body) => {
    const status = await models.User.update(body, {
        where: {
            id: id
        }
    })
    return parseInt(status)
}

const updateAddress = async(id, body) => {
    const status = await models.Address.update(body, {
        where: {
            id: id
        }
    })
    return parseInt(status)
}

module.exports = {
    createUser,
    createAddress,
    getAllUsers,
    getAllAddresses,
    getUserById,
    getAddressById,
    deleteUser,
    deleteAddress,
    updateUser,
    updateAddress
}

