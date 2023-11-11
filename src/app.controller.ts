import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { AppService } from './app.service';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('file-upload')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image' }]))
  uploadFile(@UploadedFiles() file, @Body() dto: { path: string }) {
    return this.appService.uploadFileService(
      file === null ? {} : JSON.parse(JSON.stringify(file)),
      dto.path,
    );
  }
}
