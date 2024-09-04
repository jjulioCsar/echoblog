import { Sequelize } from "sequelize";

const dbConnect = new Sequelize ("echoblog", "root", "Sen@iDev77!.",{
    host: "localhost",
    dialect: "mysql",
});

export default dbConnect;