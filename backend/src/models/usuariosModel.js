import dbConnection from "../config/dbConnection.js"
import { DataTypes } from "sequelize";

const Usuarios = dbConnection.define("usuarios", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true 
        },
        unique: true
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      papel: {
        type: DataTypes.STRING,
        allowNull: false,
        values: ["administrador", "autor", "leitor"],
        defaultValue: "leitor",
      },
    });

export default Usuarios;