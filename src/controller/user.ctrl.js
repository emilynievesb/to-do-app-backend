import User from '../services/user.service.js';

const createNewUser = async (req, res) => {
    try {
        const newUser = new User(req.DTO);
        const response = await newUser.createNewUser();

        // retornamos la lista de empresas
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

const httpMethods = {
    createNewUser,
};

export default httpMethods;
