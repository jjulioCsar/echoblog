import "dotenv/config";
import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 3333



const app = express();

//rotas
import postagensRouter from "./routes/postagensRouter.js"; 

//models


//3 middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// import connection from database (to-do)
import dbConnection from "./config/dbConnection.js"

// connection from database (to-do)
dbConnection.sync().then(()=>{
    console.log("Database connected");
    app.listen(PORT, () => {
        console.log(`Servidor online http://localhost:${PORT}`);
    });
});


//utility for router(definition of routes)
app.use("/", postagensRouter );

 app.use((req, res) =>{
    res.status(404).json({ message: 'Route not found' });
 })

