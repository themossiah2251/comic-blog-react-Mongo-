import {
  Controller,
  Get,
  Query,
  UseGuards,
  Param,
  Delete,
  Put,
  Body,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { UpdateBlogPostDto } from '../blog-post/dto/update-blog-post.dto';
import { UpdateCommentDto } from '../comment/dto/update-comment.dto';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  async getAllUsers() {
    return this.adminService.findAllUsers();
  }

  @Put('users/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.adminService.updateUser(id, updateUserDto);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUser(id);
  }

  @Get('posts')
  async getAllPosts() {
    return this.adminService.findAllPosts();
  }

  @Put('posts/:id')
  async updatePost(
    @Param('id') id: string,
    @Body() updateBlogPostDto: UpdateBlogPostDto,
  ) {
    return this.adminService.updatePost(id, updateBlogPostDto);
  }

  @Delete('posts/:id')
  async deletePost(@Param('id') id: string) {
    return this.adminService.deletePost(id);
  }

  @Get('stores')
  async getAllStores(@Query('query') query: string) {
    return this.adminService.findAllStores(query);
  }
  @Get('comments')
  async getAllComments() {
    return this.adminService.findAllComments();
  }

  @Put('comments/:id')
  async updateComment(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.adminService.updateComment(id, updateCommentDto);
  }

  @Delete('comments/:id')
  async deleteComment(@Param('id') id: string) {
    return this.adminService.deleteComment(id);
  }
}
