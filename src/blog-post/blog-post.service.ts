import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogPost } from './interfaces/blog-post.interface';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';

@Injectable()
export class BlogPostService {
  constructor(
    @InjectModel('BlogPost') private readonly blogPostModel: Model<BlogPost>,
  ) {}

  async create(
    createBlogPostDto: CreateBlogPostDto,
    userId: string,
  ): Promise<BlogPost> {
    const createdBlogPost = new this.blogPostModel({
      ...createBlogPostDto,
      author: userId,
      createdBy: userId,
    });
    return createdBlogPost.save();
  }

  async findAll(): Promise<BlogPost[]> {
    return this.blogPostModel.find().exec();
  }

  async findOne(id: string): Promise<BlogPost> {
    return this.blogPostModel.findById(id).exec();
  }

  async delete(id: string): Promise<BlogPost> {
    return this.blogPostModel.findByIdAndDelete(id).exec();
  }

  async update(
    id: string,
    updateBlogPostDto: UpdateBlogPostDto,
  ): Promise<BlogPost> {
    const existingPost = await this.blogPostModel
      .findByIdAndUpdate(id, updateBlogPostDto, { new: true })
      .exec();
    if (!existingPost) {
      throw new NotFoundException(`Blog post with ID "${id}" not found`);
    }
    return existingPost;
  }

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
