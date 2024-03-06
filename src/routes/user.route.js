import Router from 'express';
import userController from '../controller/user.ctrl.js';
import { createUserDTO, loginUserDTO } from '../DTO/user.dto.js';
import verifyAccessToken from '../middlewares/verifyToken.js';
import { changeStatusTaskDTO, createTaskDTO, getTaskDTO, updateTaskDTO } from '../DTO/task.dto.js';

const userInitRoute = () => {
    const router = Router();

    //? Ruta para crear un nuevo usuario
    router.post('/create-user/', createUserDTO, userController.createNewUser);
    //? Ruta para logear un usuario
    router.post('/login-user/', loginUserDTO, userController.loginUser);
    //? Ruta para agregar una task
    router.post('/create-task/', verifyAccessToken, createTaskDTO, userController.createNewTask);
    //? Ruta para obtener tasks
    router.get('/get-tasks/', verifyAccessToken, userController.getTasks);
    //? Ruta para obtener una task
    router.get('/get-task/', verifyAccessToken, getTaskDTO, userController.getTask);
    //? Ruta para cambiar estado de la task
    router.put('/change-status-task/', verifyAccessToken, changeStatusTaskDTO, userController.changeStatusTask);
    //? Ruta para actualizar datos de la task
    router.put('/update-task/', verifyAccessToken, updateTaskDTO, userController.updateTask);
    return router;
};

export default userInitRoute;
