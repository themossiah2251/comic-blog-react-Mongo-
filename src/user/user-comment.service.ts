import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from '../comment/interfaces/comment.interface';
import { UpdateCommentDto } from '../comment/dto/update-comment.dto';

@Injectable()
export class UserCommentService {
  constructor(
    @InjectModel('Comment') private readonly commentModel: Model<Comment>,
  ) {}

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
