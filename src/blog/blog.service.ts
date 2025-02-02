import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.post.findMany();
  }

  async findOne(id: number): Promise<Post | null> {
    return this.prisma.post.findFirst({
      where: { id },
    });
  }

  async create(data: Prisma.PostCreateInput) {
    return this.prisma.post.create({ data });
  }

  async getProductBySlug(slug: string) {
    return this.prisma.post.findFirst({
      where: {
        slug,
      },
    });
  }
}
