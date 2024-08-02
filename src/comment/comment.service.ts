import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './interfaces/comment.interface';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('Comment') private readonly commentModel: Model<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const createdComment = new this.commentModel(createCommentDto);
    return createdComment.save();
  }

  async findAllComment(postId: string): Promise<Comment[]> {
    return this.commentModel.find({ postId }).exec();
  }

  async findAllComments(): Promise<Comment[]> {
    return this.commentModel.find().exec();
  }

  async updateComment(
    id: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    return this.commentModel
      .findByIdAndUpdate(id, updateCommentDto, { new: true })
      .exec();
  }

  async deleteComment(id: string): Promise<Comment> {
    return this.commentModel.findByIdAndDelete(id).exec();
  }

  async findAllByUser(userId: string): Promise<Comment[]> {
    return this.commentModel.find({ author: userId }).exec();
  }

  async updateUserComment(
    id: string,
    updateCommentDto: UpdateCommentDto,
    userId: string,
  ): Promise<Comment> {
    const comment = await this.commentModel
      .findOne({ _id: id, author: userId })
      .exec();
    if (!comment) {
      throw new NotFoundException(
        `Comment not found or you are not the author`,
      );
    }
    return this.commentModel
      .findByIdAndUpdate(id, updateCommentDto, { new: true })
      .exec();
  }

  async deleteUserComment(id: string, userId: string): Promise<Comment> {
    const comment = await this.commentModel
      .findOne({ _id: id, author: userId })
      .exec();
    if (!comment) {
      throw new NotFoundException(
        `Comment not found or you are not the author`,
      );
    }
    return this.commentModel.findByIdAndDelete(id).exec();
  }
}
