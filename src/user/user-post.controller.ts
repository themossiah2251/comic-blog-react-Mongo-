import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserPostService } from './user-post.service';
import { UpdateBlogPostDto } from '../blog-post/dto/update-blog-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user/posts')
@UseGuards(JwtAuthGuard)
export class UserPostController {
  constructor(private readonly userPostService: UserPostService) {}

  @Get()
  async findAll(@Req() req) {
    const userId = req.user._id;
    return this.userPostService.findAllByUser(userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBlogPostDto: UpdateBlogPostDto,
    @Req() req,
  ) {
    const userId = req.user._id;
    return this.userPostService.updateUserPost(id, updateBlogPostDto, userId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req) {
    const userId = req.user._id;
    return this.userPostService.deleteUserPost(id, userId);
  }
}
