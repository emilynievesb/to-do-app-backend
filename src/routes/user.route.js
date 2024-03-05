import Router from 'express';
import userController from '../controller/user.ctrl.js';
import { createUserDTO, loginUserDTO } from '../DTO/user.dto.js';
import verifyAccessToken from '../middlewares/verifyToken.js';
import { createTaskDTO } from '../DTO/task.dto.js';

const userInitRoute = () => {
    const router = Router();

    //? Ruta para crear un nuevo usuario
    router.post('/create-user/', createUserDTO, userController.createNewUser);
    //? Ruta para logear un usuario
    router.post('/login-user/', loginUserDTO, userController.loginUser);
    //? Ruta para agregar una task
    router.post('/create-task/', verifyAccessToken, createTaskDTO, userController.createNewTask);

    return router;
};

export default userInitRoute;
