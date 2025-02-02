import { Injectable } from '@nestjs/common';
import { Category, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CatalogService {
  constructor(private prismaService: PrismaService) {}

  async getAllProducts(): Promise<Product[]> {
    return await this.prismaService.product.findMany();
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.prismaService.product.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
      include: {
        category: true,
        brand: true,
        reviews: true,
      },
    });

    return product;
  }

  async getProductbyCategory(category: string): Promise<Product[]> {
    const products = await this.prismaService.product.findMany({
      where: {
        category: {
          slug: {
            equals: category,
          },
        },
      },
      include: {
        category: true,
        brand: true,
      },
    });

    return products;
  }

  async getCategories(): Promise<Category[]> {
    return await this.prismaService.category.findMany();
  }

  async searchProducts(search: string): Promise<Product[]> {
    const products = await this.prismaService.product.findMany({
      where: {
        title: {
          contains: search,
          mode: 'insensitive',
        },
      },
    });

    return products;
  }
}
