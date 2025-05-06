const express = require('express');
require('dotenv').config();

import { AppDataSource } from './database/config';
import userRoutes from './routes/UserRoutes';


AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err : Error ) => {
        console.log("Error during Data Source initialization", err);
    });

// Crear servidor de express
const app = express();

// Directorio publico
app.use( express.static( 'public' ) );

app.use( express.json() );

app.use('/api/user' , userRoutes ); 

app.listen( process.env.EXPRESS_PORT , () => {
    console.log(`Servidor corriendo en puerto ${ process.env.EXPRESS_PORT }  `)
} );