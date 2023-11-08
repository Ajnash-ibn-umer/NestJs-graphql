import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { loginUserData, registerUserInfo } from 'src/users/dtos/user.dto';
import { AuthService } from 'src/users/services/auth/auth.service';
import { UsersGuard } from 'src/users/guards/access/users.guard';
import { Request } from 'express';
import { RefreshGuard } from 'src/users/guards/refresh/refresh.guard';
import { ApiBody } from '@nestjs/swagger';
import { UserService } from 'src/users/services/user/user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { companyDto } from 'src/users/dtos/company.dto';

@Controller('users')
export class UsersController {
  constructor(
    private authSevice: AuthService,
    private userService: UserService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async userRegister(@Body() userInfo: registerUserInfo, @UploadedFile() file) {
    console.log({ file });
    // if (!file) throw new HttpException('image is Required', 400);
    // let fileResponse = this.userService.uploadFile(file);
    return this.authSevice.signUp(userInfo);
  }

  @ApiBody({ type: loginUserData })
  @Post('login')
  async userLogin(@Body() userInfo: loginUserData) {
    return this.authSevice.login(userInfo);
  }

  @Get()
  @UseGuards(UsersGuard)
  async userInfo(@Req() req: any) {
    return { user: req.user };
  }

  @Get('refresh')
  @UseGuards(RefreshGuard)
  async refreshingToken(@Req() req: any) {
    delete req.user.exp;
    delete req.user.iat;

    return this.authSevice.getToken(req.user);
  }

  @Post("company")
  async createCompany(@Body() companyDto:companyDto){
    return this.userService.addCompany(companyDto)
  }
}
