import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { BlogPostService } from './blog-post.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { BlogPost } from './interfaces/blog-post.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';

@Controller('api/blogposts')
export class BlogPostController {
  constructor(private readonly blogPostService: BlogPostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
    }),
  )
  async create(
    @Body() createBlogPostDto: CreateBlogPostDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
  ): Promise<BlogPost> {
    const blogPostData = {
      ...createBlogPostDto,
      image: file ? file.filename : undefined,
    };
    const userId = req.user.userId;
    return this.blogPostService.create(blogPostData, userId);
  }

  @Get()
  async findAll(): Promise<BlogPost[]> {
    return this.blogPostService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BlogPost> {
    return this.blogPostService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<BlogPost> {
    return this.blogPostService.delete(id);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`;
          cb(null, `${file.fieldname}-${uniqueSuffix}`);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateBlogPostDto: UpdateBlogPostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      updateBlogPostDto.image = file.filename;
    }
    return this.blogPostService.update(id, updateBlogPostDto);
  }
}
