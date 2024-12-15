import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Post as PostModel } from '@prisma/client';

@Controller('blog')
export class BlogController {
    constructor(private blogService: BlogService) {}

    @Get()
    getPosts() {
        return this.blogService.findAll();
    }

    @Get(":id")
    getPost(@Param('id', ParseIntPipe) id: number) {
        return this.blogService.findOne(id);
    }

    @Post()
    async createPost(@Body() body: PostModel) {
        console.log("body", body);
        return this.blogService.create({...body});
    }
}
