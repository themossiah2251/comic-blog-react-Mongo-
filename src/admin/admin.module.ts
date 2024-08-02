import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { StoreModule } from '../store/store.module';
import { UserModule } from '../user/user.module';
import { BlogPostModule } from '../blog-post/blog-post.module';
import { CommentModule } from '../comment/comment.module';

@Module({
  imports: [UserModule, BlogPostModule, StoreModule, CommentModule],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
