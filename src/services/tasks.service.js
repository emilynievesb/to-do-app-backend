import UserModel from '../schemas/user.schema.js';

class Task {
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
            console.log(user);
            await user.save();
            return newTask;
        } catch (error) {
            console.error('Error al crear tarea:', error.message);
            throw error;
        }
    }
}

export default Task;
