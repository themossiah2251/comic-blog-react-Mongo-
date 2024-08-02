import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogPost } from '../blog-post/interfaces/blog-post.interface';
import { UpdateBlogPostDto } from '../blog-post/dto/update-blog-post.dto';

@Injectable()
export class UserPostService {
  constructor(
    @InjectModel('BlogPost') private readonly blogPostModel: Model<BlogPost>,
  ) {}

  async findAllByUser(userId: string): Promise<BlogPost[]> {
    return this.blogPostModel.find({ author: userId }).exec();
  }

  async updateUserPost(
    id: string,
    updateBlogPostDto: UpdateBlogPostDto,
    userId: string,
  ): Promise<BlogPost> {
    const post = await this.blogPostModel
      .findOne({ _id: id, author: userId })
      .exec();
    if (!post) {
      throw new NotFoundException(`Post not found or you are not the author`);
    }
    return this.blogPostModel
      .findByIdAndUpdate(id, updateBlogPostDto, { new: true })
      .exec();
  }

  async deleteUserPost(id: string, userId: string): Promise<BlogPost> {
    const post = await this.blogPostModel
      .findOne({ _id: id, author: userId })
      .exec();
    if (!post) {
      throw new NotFoundException(`Post not found or you are not the author`);
    }
    return this.blogPostModel.findByIdAndDelete(id).exec();
  }
}
