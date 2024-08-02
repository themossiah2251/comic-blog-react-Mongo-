import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserPostController } from './user-post.controller';
import { UserCommentController } from './user-comment.controller';
import { UserPostService } from './user-post.service';
import { UserCommentService } from './user-comment.service';
import { UserSchema } from './schemas/user.schema';
import { BlogPostSchema } from '../blog-post/schemas/blog-post.schema';
import { CommentSchema } from '../comment/schemas/comment.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'BlogPost', schema: BlogPostSchema }]),
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
  ],
  controllers: [UserPostController, UserCommentController],
  providers: [UserPostService, UserCommentService, UserService],
  exports: [UserService], // Export UserService
})
export class UserModule {}
