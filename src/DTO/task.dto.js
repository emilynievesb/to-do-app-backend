import { boolean, date, number, object, string } from 'yup';

export const createTaskDTO = async (req, res, next) => {
    try {
        const taskSchema = object({
            title: string().required('El título es requerido'),
            description: string().required('La descripción es requerida'),
            dead_date: date().required('La fecha de vencimiento es requerida'),
            degree: string().oneOf(['Muy importante', 'Importante', 'Normal']).default('Normal'),
            status: boolean().default(false),
        });

        req.DTO = await taskSchema.validate(req.body);
        next();
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.errors });
    }
};
export const getTaskDTO = async (req, res, next) => {
    try {
        const taskSchema = object({
            id: number().required('El id de la task es requerido'),
        });

        req.DTO = await taskSchema.validate(req.query);
        next();
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.errors });
    }
};

export const changeStatusTaskDTO = async (req, res, next) => {
    try {
        const taskSchema = object({
            id: number().required('El id de la task es requerido'),
        });

        req.DTO = await taskSchema.validate(req.query);
        next();
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.errors });
    }
};
export const updateTaskDTO = async (req, res, next) => {
    try {
        const taskSchema = object({
            title: string().required('El título de la tarea es requerido'),
            description: string().required('La descripción de la tarea es requerida'),
            dead_date: date().required('La fecha límite de la tarea es requerida'),
            degree: string().oneOf(['Muy importante', 'Importante', 'Normal']).required('El grado de importancia de la tarea es requerido'),
        });

        req.DTO = await taskSchema.validate(req.body);
        next();
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.errors });
    }
};
