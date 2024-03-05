import { boolean, date, object, string } from 'yup';

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