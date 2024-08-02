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
import { UserCommentService } from './user-comment.service';
import { UpdateCommentDto } from '../comment/dto/update-comment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user/comments')
@UseGuards(JwtAuthGuard)
export class UserCommentController {
  constructor(private readonly userCommentService: UserCommentService) {}

  @Get()
  async findAll(@Req() req) {
    const userId = req.user._id;
    return this.userCommentService.findAllByUser(userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Req() req,
  ) {
    const userId = req.user._id;
    return this.userCommentService.updateUserComment(
      id,
      updateCommentDto,
      userId,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req) {
    const userId = req.user._id;
    return this.userCommentService.deleteUserComment(id, userId);
  }
}
