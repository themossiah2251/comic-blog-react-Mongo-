import { Schema } from 'mongoose';

export const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});
