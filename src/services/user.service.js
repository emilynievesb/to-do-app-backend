import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../schemas/user.schema.js';
import config from '../config/config.js';
class User {
    name;
    username;
    password;
    tasks;
    constructor({
        name,
        username,
        password,
        tasks = [
            {
                title: 'Tarea de ejemplo',
                description: 'Descripción de la tarea',
                dead_date: new Date('2024-12-15'),
                degree: 'Muy importante',
                status: false,
            },
        ],
    }) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.tasks = tasks;
    }
    generateAccessToken() {
        try {
            const token = jwt.sign({ username: this.username }, config.secret_key, { expiresIn: '7h' });
            return token;
        } catch (error) {
            throw error;
        }
    }
    async passwordHash() {
        try {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            return hashedPassword;
        } catch (error) {
            throw error;
        }
    }
    async existingUser() {
        const existingUser = await UserModel.findOne({ username: this.username });
        if (existingUser) {
            throw new Error('El nombre de usuario ya está en uso');
        }
    }

    async createNewUser() {
        try {
            await this.existingUser();
            const hashedPassword = await this.passwordHash();
            const newUser = new UserModel({ name: this.name, username: this.username, password: hashedPassword, tasks: this.tasks });
            const res = await newUser.save();
            return {
                token: this.generateAccessToken(),
                res,
            };
        } catch (error) {
            throw error;
        }
    }
}

export default User;
