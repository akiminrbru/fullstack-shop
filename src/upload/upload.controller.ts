import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  @Post('uploadImage')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: Math.pow(1024, 2) * 1 },
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    const fileUrl = `${file.filename}`;
    return {
      url: fileUrl,
    };
  }
}
