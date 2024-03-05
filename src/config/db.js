import mongoose from 'mongoose';
import config from './config.js';

async function connect() {
    try {
        await mongoose.connect(config.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conexión exitosa a la base de datos');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw error;
    }
}
export default connect;
