import { Schema } from 'mongoose';

export const CalendarSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});
