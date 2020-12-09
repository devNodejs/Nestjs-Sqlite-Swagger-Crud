import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { postsProviders } from './posts.providers';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [PostsService, ...postsProviders],
  controllers: [PostsController],
})
export class PostsModule {}
