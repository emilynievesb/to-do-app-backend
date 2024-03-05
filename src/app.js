import express from 'express';
import cors from 'cors';
import config from './config/config.js';
import connect from './config/db.js';

const createApp = async () => {
    // llamamos a express
    const app = express();

    // le decimos que use json
    app.use(express.json());

    // permite que el analizador maneje objetos y matrices complejas en los datos codificados en formato URL
    app.use(express.urlencoded({ extended: true }));

    // configuramos los cors
    app.use(
        cors({
            origin: `${config.domain_front}`,
            credentials: true,
            optionsSuccessStatus: 200,
        })
    );

    //conexión a la base de datos
    connect()
        .then(() => {
            console.log('Conexión a la base de datos exitosa');
        })
        .catch((error) => {
            // Maneja el error si la conexión falla
            console.error('Error al conectar a la base de datos:', error);
        });
    // ruta principal
    // app.use('/api',);

    return { app };
};

export default createApp;
