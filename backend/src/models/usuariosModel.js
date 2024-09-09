import dbConnection from "../config/dbConnection.js"
import { DataTypes } from "sequelize";

const Usuarios = dbConnection.define("usuarios", {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true    
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    senha:{
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    papel:{
        type: DataTypes.ENUM,
        allowNull: true,
        defaultValue: "leitor" ,
        values: ["administrador", "autor", "leitor"]
    }
},{
    tableName: "Usuarios"
}
);

export default Usuarios;