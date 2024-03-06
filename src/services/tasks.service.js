import UserModel from '../schemas/user.schema.js';

class Task {
    id;
    title;
    description;
    dead_date;
    degree;
    status;
    constructor({ title, description, dead_date, degree = 'Normal', status = false }) {
        this.title = title;
        this.description = description;
        this.dead_date = dead_date;
        this.degree = degree;
        this.status = status;
    }
    async createTask(username) {
        try {
            const user = await UserModel.findOne({ username: username });
            const { tasks } = user;
            const nextId = Math.max(...tasks.map((t) => t.id)) + 1;
            const newTask = {
                ...this,
                id: nextId,
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
            console.log(tasks);
            const updatedTasks = tasks.map((t) => {
                if (t.id === this.id) {
                    return { ...t, status: !t.status };
                }
                return t;
            });
            user.tasks = updatedTasks;
            console.log(user.tasks);

            await user.save();
            return updatedTasks;
        } catch (error) {
            console.error('Error al crear tarea:', error.message);
            throw error;
        }
    }
}

export default Task;
