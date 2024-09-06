import "dotenv/config";
import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";  // Para obter o caminho correto em módulos ES

const PORT = process.env.PORT || 3333;

// Obter o caminho atual em módulos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Rotas
import postagensRouter from "./routes/postagensRouter.js"; 

// Models
import postagensModel from "./models/postagensModel.js";

// Conexão com banco de dados
import dbConnection from "./config/dbConnection.js";

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurar o diretório de uploads 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Conexão com banco de dados
dbConnection.sync().then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
        console.log(`Servidor online http://localhost:${PORT}`);
    });
});

// Definir rotas
app.use("/", postagensRouter);

// Middleware para tratar rotas não encontradas
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
