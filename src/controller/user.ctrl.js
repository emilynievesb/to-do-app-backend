import User from '../services/user.service.js';

const createNewUser = async (req, res) => {
    try {
        const newUser = new User(req.DTO);
        const response = await newUser.createNewUser();

        return res.json({
            statusCode: 200,
            status: true,
            message: 'Agregado correctamente',
            response,
        });
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            status: true,
            message: error.message,
        });
    }
};
const loginUser = async (req, res) => {
    try {
        const user = new User(req.DTO);
        const response = await user.loginUser();

        return res.json({
            statusCode: 200,
            status: true,
            message: 'Ha ingresado correctamente',
            response,
        });
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            status: true,
            message: error.message,
        });
    }
};

const createNewTask = async (req, res) => {
    try {
        const user = new User({ username: req.usuario.username, task: req.DTO });
        const response = await user.createNewTask();

        return res.json({
            statusCode: 200,
            status: true,
            message: 'Agregado correctamente',
            response,
        });
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            status: true,
            message: error.message,
        });
    }
};
const getTasks = async (req, res) => {
    try {
        const user = new User({ username: req.usuario.username });
        const response = await user.getTasks();

        return res.json({
            statusCode: 200,
            status: true,
            message: 'Consultado correctamente',
            response,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            statusCode: 400,
            status: true,
            message: error.message,
        });
    }
};
const getTask = async (req, res) => {
    try {
        const user = new User({ username: req.usuario.username, task: req.DTO });
        const response = await user.getTask();

        return res.json({
            statusCode: 200,
            status: true,
            message: 'Consultado correctamente',
            response,
        });
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            status: true,
            message: error.message,
        });
    }
};
const changeStatusTask = async (req, res) => {
    try {
        const user = new User({ username: req.usuario.username, task: req.DTO });
        const response = await user.changeStatusTask();

        return res.json({
            statusCode: 200,
            status: true,
            message: 'Cambio de estatus hecho correctamente',
            response,
        });
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            status: true,
            message: error.message,
        });
    }
};
const httpMethods = {
    createNewUser,
    loginUser,
    createNewTask,
    changeStatusTask,
    getTask,
    getTasks,
};

export default httpMethods;
