import dbConnection from "../config/dbConnection.js"
import { DataTypes } from "sequelize";

const Postagem = dbConnection.define("Postagens", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      conteudo: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      usuarioId: {
        type: DataTypes.UUID,
        references: {
          model: 'usuarios',
          key: 'id',
        },
        allowNull: false, 
      },
      imagem: {
        type: DataTypes.STRING,
        defaultValue: null
      }
    });

export default Postagem;