import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('api/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Get()
  async findAllComments(@Query('postId') postId: string) {
    if (postId) {
      return this.commentService.findAllComment(postId);
    }
    return this.commentService.findAllComments();
  }
}
