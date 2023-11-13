import { Module } from '@nestjs/common';
import { GlobalGallaryService } from './global-gallary.service';
import { GlobalGallaryResolver } from './global-gallary.resolver';

@Module({
  providers: [GlobalGallaryResolver, GlobalGallaryService],
})
export class GlobalGallaryModule {}
