import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import UserModel from '../schemas/user.schema.js';
import config from '../config/config.js';
import Task from './tasks.service.js';
class User {
    name;
    username;
    password;
    tasks;
    constructor({
        name = 'A name default',
        username,
        password,
        task = {
            id: uuidv4(),
            title: 'Tarea de ejemplo',
            description: 'Descripción de la tarea',
            dead_date: new Date('2024-12-15'),
            degree: 'Muy importante',
            status: false,
        },
    }) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.task = task;
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
    async loginUser() {
        try {
            const user = await UserModel.findOne({ username: this.username });
            if (!user) {
                throw new Error('Usuario no encontrado');
            }

            //* Comparar la contraseña ingresada con la almacenada en la base de datos
            const passwordMatch = await bcrypt.compare(this.password, user.password);
            if (!passwordMatch) {
                throw new Error('Contraseña incorrecta');
            }

            return {
                token: this.generateAccessToken(),
                name: user.name,
                username: user.username,
            };
        } catch (error) {
            throw error;
        }
    }
    async createNewUser() {
        try {
            await this.existingUser();
            const hashedPassword = await this.passwordHash();
            const newUser = new UserModel({ name: this.name, username: this.username, password: hashedPassword, tasks: [this.task] });
            const res = await newUser.save();
            return {
                token: this.generateAccessToken(),
                res,
            };
        } catch (error) {
            console.log(error.errInfo);
            throw error;
        }
    }
    async createNewTask() {
        try {
            const task = new Task(this.task);
            const res = await task.createTask(this.username);
            return {
                res,
            };
        } catch (error) {
            console.log(error.errInfo);
            throw error;
        }
    }
    async getTasks() {
        try {
            const task = new Task({});
            const res = await task.getTasks(this.username);
            return {
                res,
            };
        } catch (error) {
            console.log(error.errInfo);
            throw error;
        }
    }
    async getTask() {
        try {
            const task = new Task(this.task);
            const res = await task.getTask(this.username);
            return {
                res,
            };
        } catch (error) {
            console.log(error.errInfo);
            throw error;
        }
    }
    async changeStatusTask() {
        try {
            const task = new Task(this.task);
            const res = await task.changeStatusTask(this.username);
            return {
                res,
            };
        } catch (error) {
            console.log(error.errInfo);
            throw error;
        }
    }
    async updateTask() {
        try {
            const task = new Task(this.task);
            const res = await task.updateTask(this.username);
            return {
                res,
            };
        } catch (error) {
            console.log(error.errInfo);
            throw error;
        }
    }
    async deleteTask() {
        try {
            const task = new Task(this.task);
            const res = await task.deleteTask(this.username);
            return {
                res,
            };
        } catch (error) {
            console.log(error.errInfo);
            throw error;
        }
    }
}

export default User;
