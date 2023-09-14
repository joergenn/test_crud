import Sequelize from "sequelize"

export const sequelize = new Sequelize("test", "root", "8888", {
    host: "localhost",
    dialect: "mysql"
})