import {User, Address} from "./models.js"

export const getAllUsers = async() => {
    let users = await User.findAll()
    users = users.map(user => {
        const {image: image, ...rest} = user.dataValues
        return rest
    })
    console.log(users)
    return users
}

export const getAllAddresses = async() => {
    const addresses = await Address.findAll()
    return addresses
}

export const getUserById = async(id) => {
    const user = await User.findByPk(id)
    return user
}

export const getAddressById = async(id) => {
    const address = await Address.findByPk(id)
    return address
}

export const createUser= async(body) => {
    console.log(body)
    const user = await User.create(body)
    return user
}

export const createAddress = async(body) => {
    console.log(body)
    const address = await Address.create(body)
    return address
}

export const deleteUser = async(id) => {
    const status = await User.destroy({
        where: {
            id: id
        }
    })
    return status
}

export const deleteAddress = async(id) => {
    const status = await Address.destroy({
        where: {
            id: id
        }
    })
    return status
}

export const updateUser = async(id, body) => {
    const status = await User.update(body, {
        where: {
            id: id
        }
    })
    return parseInt(status)
}

export const updateAddress = async(id, body) => {
    const status = await Address.update(body, {
        where: {
            id: id
        }
    })
    return parseInt(status)
}



