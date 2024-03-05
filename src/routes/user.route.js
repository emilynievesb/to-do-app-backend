import Router from 'express';
import userController from '../controller/user.ctrl.js';
import { createUserDTO, loginUserDTO } from '../DTO/user.dto.js';

const userInitRoute = () => {
    const router = Router();

    //? Ruta para crear un nuevo usuario
    router.post('/create-user/', createUserDTO, userController.createNewUser);
    //? Ruta para logear un usuario
    router.post('/login-user/', loginUserDTO, userController.loginUser);

    return router;
};

export default userInitRoute;
