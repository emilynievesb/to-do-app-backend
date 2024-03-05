import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    creation_date: { type: Date, default: Date.now },
    dead_date: { type: Date, required: true },
    degree: { type: String, enum: ['Muy importante', 'Importante', 'Normal'], default: 'Normal' },
    status: { type: Boolean, default: false },
});

// Define schema for user
const userSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tasks: [taskSchema], // Array of task objects
});

const UserModel = model('User', userSchema);
export default UserModel;
