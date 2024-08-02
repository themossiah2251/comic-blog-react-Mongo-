import { Document } from 'mongoose';

export interface Comment extends Document {
  readonly postId: string;
  readonly content: string;
  readonly createdAt: Date;
}
