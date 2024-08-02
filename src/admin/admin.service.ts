import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { BlogPostService } from '../blog-post/blog-post.service';
import { StoreService } from '../store/store.service';
import { CommentService } from '../comment/comment.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { UpdateBlogPostDto } from '../blog-post/dto/update-blog-post.dto';
import { UpdateCommentDto } from '../comment/dto/update-comment.dto';
import { BlogPost } from '../blog-post/interfaces/blog-post.interface';

@Injectable()
export class AdminService {
  constructor(
    private readonly userService: UserService,
    private readonly blogPostService: BlogPostService,
    private readonly storeService: StoreService,
    private readonly commentService: CommentService,
  ) {}

  async findAllUsers() {
    return this.userService.findAll();
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  async deleteUser(id: string) {
    return this.userService.deleteUser(id);
  }

  async findAllPosts(): Promise<BlogPost[]> {
    return this.blogPostService.findAll();
  }

  async updatePost(
    id: string,
    updateBlogPostDto: UpdateBlogPostDto,
  ): Promise<BlogPost> {
    return this.blogPostService.update(id, updateBlogPostDto);
  }

  async deletePost(id: string): Promise<BlogPost> {
    return this.blogPostService.delete(id);
  }

  async findAllStores(query: string) {
    return this.storeService.findStores(query);
  }

  async findAllComments() {
    return this.commentService.findAllComments();
  }

  async updateComment(id: string, updateCommentDto: UpdateCommentDto) {
    return this.commentService.updateComment(id, updateCommentDto);
  }

  async deleteComment(id: string) {
    return this.commentService.deleteComment(id);
  }

  async createAdminUser() {
    const username = 'admin';
    const plainPassword = '123456';
    const email = 'admin@example.com';

    const existingUser = await this.userService.findByUsername(username);
    if (existingUser) {
      console.log('Admin user already exists.');
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    const adminUser = {
      username,
      password: hashedPassword,
      email,
      role: 'admin',
    };

    await this.userService.create(adminUser);
    console.log('Admin user created successfully.');
  }
}
