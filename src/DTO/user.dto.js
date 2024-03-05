import { object, string, number, date } from 'yup';

export const createUserDTO = async (req, res, next) => {
    try {
        const userSchema = object({
            name: string().required('El nombre es requerido'),
            username: string().required('El nombre de usuario es requerido'),
            password: string()
                .required('La contraseña es requerida')
                .matches(/^(?=.*[A-Z])(?=.*[0-9]).{8,}$/, 'La contraseña debe tener al menos una mayúscula, un número y ser de al menos 8 caracteres'),
        });
        req.DTO = await userSchema.validate(req.body);
        next();
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.errors });
    }
};
export const loginUserDTO = async (req, res, next) => {
    try {
        const userSchema = object({
            username: string().required('El nombre de usuario es requerido'),
            password: string()
                .required('La contraseña es requerida')
                .matches(/^(?=.*[A-Z])(?=.*[0-9]).{8,}$/, 'La contraseña debe tener al menos una mayúscula, un número y ser de al menos 8 caracteres'),
        });
        req.DTO = await userSchema.validate(req.body);
        next();
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.errors });
    }
};
