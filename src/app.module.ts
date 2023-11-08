import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app/app.controller';
import { ServiceService } from './service/service.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    MongooseModule.forRoot(process.env.DB),
    
  ],
  controllers: [AppController],
  providers: [ServiceService],
})
export class AppModule {}
