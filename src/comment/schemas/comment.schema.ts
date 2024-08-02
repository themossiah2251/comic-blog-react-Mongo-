import { Schema } from 'mongoose';

export const CommentSchema = new Schema({
  postId: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
