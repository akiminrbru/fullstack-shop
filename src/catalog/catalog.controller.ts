import { CatalogService } from './catalog.service';
import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('catalog')
export class CatalogController {
  constructor(private catalogService: CatalogService) {}

  @Get('getAllProducts')
  getAllProducts() {
    return this.catalogService.getAllProducts();
  }

  @Get('getProductById/:id')
  getProductById(@Param() params: { id: string }) {
    const id = Number(params.id || '');
    return this.catalogService.getProductById(id);
  }

  @Get('getProductbyCategory')
  getProductbyCategory(@Query() query: { category: string }) {
    const category = query.category || '';
    return this.catalogService.getProductbyCategory(category);
  }

  @Get('getCategories')
  getCategories() {
    return this.catalogService.getCategories();
  }

  @Get('searchProducts')
  searchProducts(@Query() query: { search: string }) {
    const search = query.search || '';

    return this.catalogService.searchProducts(search);
  }
}
