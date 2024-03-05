import { Schema, model } from 'mongoose';
import taskSchema from './task.schema.js';

// Define schema for user
const userSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tasks: [taskSchema], // Array of task objects
});

const UserModel = model('User', userSchema);
export default UserModel;
