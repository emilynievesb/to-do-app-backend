import { Schema } from 'mongoose';

const taskSchema = new Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    creation_date: { type: Date, default: Date.now },
    dead_date: { type: Date, required: true },
    degree: { type: String, enum: ['Muy importante', 'Importante', 'Normal'], default: 'Normal' },
    status: { type: Boolean, default: false },
});

export default taskSchema;
