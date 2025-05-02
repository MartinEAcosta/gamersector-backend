const express = require('express');
import { Request, Response } from 'express';
require('dotenv').config();
import { AppDataSource } from './database/config';

AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.log("Error during Data Source initialization", err);
    });

// Crear servidor de express
const app = express();

// Directorio publico
app.use( express.static( 'public' ) );

app.get("/users", function (req: Request, res: Response) {
    return res.status(200).json({
        ok:true,
        msg: "Prueba de envio",
    })
})

app.listen( process.env.EXPRESS_PORT , () => {
    console.log(`Servidor corriendo en puerto ${ process.env.EXPRESS_PORT }  `)
} );