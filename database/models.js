import {sequelize }from "./connection.js"
import {Sequelize, DataTypes} from "sequelize";

export const Address = sequelize.define('address', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: {
                msg: "Country can contain only letters"
            }
        }
    }, 
    state: {
        type: DataTypes.STRING,
        validate: {
            isAlpha: {
                msg: "State can contain only letters"
            }
        }
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: {
                msg: "City can contain only letters"
            }
        }
    },
    zipCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: [10000],
                msg: "Must be greater or equal than 10000"
            },
            max: {
                args: [99999],
                msg: "Must be less or equal than 99999"
            }
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    }
    }, {
    timestamps: false
})

export const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: {
                msg: "First name can contain only letters"
            }
        }
    }, 
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: {
                msg: "Last name can contain only letters"
            }
        }
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isNumeric: {
                msg: "Phone number can contain only numbers"
            } 
        }
    },
    birthday: {
        type: DataTypes.DATE,
        isDate: {
            msg: "Birthday must be valid date"
        }
    },
    image: {
        type: DataTypes.BLOB,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
    }, {
    timestamps: false
})

User.hasMany(Address, {
    foreignKey: {
        allowNull: false
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
})
Address.belongsTo(User)
