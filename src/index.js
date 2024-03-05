import createApp from './app.js';
import config from './config/config.js';
const port = config.port || 8080;

// funcion principal
const main = async () => {
    const { app } = await createApp();
    app.listen(port, () => {
        console.log(`server runninng:  http://localhost:${port}`);
    });
};

main();
