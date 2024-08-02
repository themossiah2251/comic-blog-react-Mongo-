import { Document } from 'mongoose';

export interface BlogPost extends Document {
  readonly title: string;
  readonly content: string;
  readonly image?: string;
  readonly createdAt: Date;
}
