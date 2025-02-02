import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { Post as PostModel } from '@prisma/client';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  getPosts() {
    return this.blogService.findAll();
  }

  @Get('getProductBySlug')
  getProductBySlug(@Query() query: { slug: string }) {
    const slug = query.slug || '';
    return this.blogService.getProductBySlug(slug);
  }

  @Get(':id')
  getPost(@Param('id', ParseIntPipe) id: number) {
    return this.blogService.findOne(id);
  }

  @Post()
  async createPost(@Body() body: PostModel) {
    return this.blogService.create(body);
  }
}
