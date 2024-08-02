import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogPostService } from './blog-post.service';
import { BlogPostController } from './blog-post.controller';
import { BlogPostSchema } from './schemas/blog-post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'BlogPost', schema: BlogPostSchema }]),
  ],
  providers: [BlogPostService],
  controllers: [BlogPostController],
  exports: [BlogPostService],
})
export class BlogPostModule {}
