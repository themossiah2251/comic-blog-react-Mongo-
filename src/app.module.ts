import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogPostModule } from './blog-post/blog-post.module';
import { UserModule } from './user/user.module';
import { StoreModule } from './store/store.module';
import { CalendarModule } from './calendar/calendar.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { EventModule } from './event/event.module';
import { CommentController } from './comment/comment.controller';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/comicblog'),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    BlogPostModule,
    UserModule,
    StoreModule,
    CalendarModule,
    AdminModule,
    AuthModule,
    EventModule,
    CommentModule,
  ],
  controllers: [AppController, CommentController],
  providers: [AppService],
})
export class AppModule {}
