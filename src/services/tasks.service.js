import { v4 as uuidv4 } from 'uuid';
import UserModel from '../schemas/user.schema.js';

class Task {
    id;
    n;
    title;
    description;
    dead_date;
    degree;
    status;
    constructor({ id = uuidv4(), n = 1, title = 'Título', description = 'Descripción', dead_date = 'fecha', degree = 'Normal', status = false }) {
        this.id = id;
        this.n = n;
        this.title = title;
        this.description = description;
        this.dead_date = dead_date;
        this.degree = degree;
        this.status = status;
    }
    async getTasks(username) {
        try {
            const user = await UserModel.findOne({ username });
            return user.tasks;
        } catch (error) {
            console.error('Error al consultar tareas:', error.message);
            throw error;
        }
    }
    async getTask(username) {
        try {
            const user = await UserModel.findOne({ username });
            const { tasks } = user;
            return tasks.find((task) => task.id === this.id);
        } catch (error) {
            console.error('Error al consultar tarea:', error.message);
            throw error;
        }
    }
    async createTask(username) {
        try {
            const user = await UserModel.findOne({ username });
            const { tasks } = user;
            const nextId = Math.max(...tasks.map((t) => t.n)) + 1;
            const newTask = {
                ...this,
                n: nextId,
            };
            user.tasks.push(newTask);
            await user.save();
            return newTask;
        } catch (error) {
            console.error('Error al crear tarea:', error.message);
            throw error;
        }
    }
    async changeStatusTask(username) {
        try {
            const user = await UserModel.findOne({ username: username });
            let { tasks } = user;
            const updatedTasks = tasks.map((t) => {
                if (t.id === this.id) {
                    return { ...t, status: !t.status };
                }
                return t;
            });
            user.tasks = updatedTasks;
            await user.save();
            return user.tasks;
        } catch (error) {
            console.error('Error al cambiar estado de tarea:', error.message);
            throw error;
        }
    }
    async updateTask(username) {
        try {
            const user = await UserModel.findOne({ username: username });
            let { tasks } = user;
            const updatedTasks = tasks.map((t) => {
                if (t.id === this.id) {
                    return { ...t, title: this.title, description: this.description, dead_date: new Date(this.dead_date), degree: this.degree };
                }
                return t;
            });
            user.tasks = updatedTasks;
            await user.save();
            return user.tasks;
        } catch (error) {
            console.error('Error al actualizar tarea:', error.message);
            throw error;
        }
    }
    async deleteTask(username) {
        try {
            const user = await UserModel.findOne({ username: username });
            let { tasks } = user;
            const updatedTasks = tasks.filter((task) => task.id !== this.id);
            user.tasks = updatedTasks;
            await user.save();
            return user.tasks;
        } catch (error) {
            console.error('Error al eliminación de una tarea:', error.message);
            throw error;
        }
    }
}

export default Task;
