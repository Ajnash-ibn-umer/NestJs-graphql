import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ModelWeight } from '../../../model_wieght.ts/model_weights';
import { ModelResponse_format } from '../../../model_wieght.ts/reponse_formate';
import { User } from '../../../users/controllers/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async signUp(userInfo) {
    try {
      console.log({ userInfo });

      userInfo.company=new mongoose.Types.ObjectId(userInfo.company)
      const newUser = await new this.userModel(userInfo).save();

      // this.mailerService.sendMail({
      //   to: 'ajnash.k02@gmail.com',
      //   from: 'ajnash.nexteons@gmail.com',
      //   subject: 'Testing',
      //   text: 'welcome',
      //   template: 'index',
      //   context: {
      //     otp: Math.floor(1000 + Math.random() * 9000),
      //     name: userInfo.name,
      //   },
      // });

      let userAggregation = [];

      userAggregation.push({
        $match: { _id: new mongoose.Types.ObjectId(newUser._id) },
      });

      userAggregation.push(
        new ModelResponse_format().userReponseFormat(
          0,
          userInfo.responseFormat,
        ),
      );

      if (userInfo.screentype.includes(100)) {
        const companyPipeline=()=>{ 
          let pipeline = [];
          console.log("company format",   new ModelResponse_format().companyResponseFormat(
            1000,
            userInfo.responseFormat
          ));
          
          pipeline.push(
            {
              $match:{ $expr:{$eq:["$_id","$$companyId"]}}
            },
            new ModelResponse_format().companyResponseFormat(
              1000,
              userInfo.responseFormat
            )
          )
          return pipeline;
        }
      
        userAggregation.push({
          $lookup: {
            let:{companyId:"$company"},
            from: 'companies',
           pipeline:companyPipeline(),
            as: 'company',
          }
         
        },
        {
          $unwind:{
            path:"$company"
          }
        });
      }
      const userResult = await this.userModel.aggregate(userAggregation);
      console.log({ userResult });

      return userResult;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async login(userData) {
    try {
      const userExist = await this.userModel
        .findOne({ email: userData.email })
        .lean();
      if (!userExist)
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

      if (userData.password !== userExist.password)
        throw new HttpException(
          'Password is incorrect',
          HttpStatus.BAD_REQUEST,
        );
      const payload = {
        sub: userExist._id,
        username: userExist.email,
        email: userExist.email,
      };

      const { access_token, refresh_token } = await this.getToken(payload);
      return { access_token, refresh_token };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async getToken(payload) {
    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: process.env.REFRESH_TOKEN_SECRET,
    });

    return { access_token, refresh_token };
  }
}
