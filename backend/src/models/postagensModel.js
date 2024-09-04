import dbConnection from "../config/dbConnection.js"
import { DataTypes } from "sequelize";

const Postagem = dbConnection.define("tarefas", {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true    
    },
    titulo:{
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    conteudo:{
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    dataPublicacao:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        required: true
    },
    autor:{
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    imagem:{
        type: DataTypes.STRING,
        required: true
    }
},{
    tableName: "Postagem"
}
);

export default Postagem;