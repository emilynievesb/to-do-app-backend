import dotenv from 'dotenv';
dotenv.config();

export default {
    uri: process.env.URI,
    port: process.env.PORT,
    domain_front: process.env.DOMAIN_FRONT,
    secret_key: process.env.SECRET_KEY,
};
