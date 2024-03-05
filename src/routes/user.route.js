import Router from 'express';
import userController from '../controller/user.ctrl.js';
import createUserDTO from '../DTO/user.dto.js';

const userInitRoute = () => {
    const router = Router();

    //? Ruta para crear un nuevo usuario
    router.post('/create-user/', createUserDTO, userController.createNewUser);

    return router;
};

export default userInitRoute;
