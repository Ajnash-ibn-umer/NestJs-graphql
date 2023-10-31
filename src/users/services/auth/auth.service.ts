import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/controllers/users/schemas/user.schema';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService,
        private readonly mailerService: MailerService) { }

    async signUp(userInfo) {
        try {
            const newUser = await new this.userModel(userInfo).save()
         
            const em = this.mailerService
                .sendMail({
                    to: 'ajnash.k02@gmail.com',
                    from: 'ajnash.nexteons@gmail.com',
                    subject: 'Testing',
                    text: 'welcome',
                    template: "index",
                    context: {
                        otp: Math.floor(1000 + Math.random() * 9000),
                        name: userInfo.name,
                    },
                })
         

            return newUser
        } catch (error) {
           

            throw new HttpException(error.message, 500)
        }
    }

    async login(userData) {
        try {
            const userExist = await this.userModel.findOne({ email: userData.email }).lean()
            if (!userExist) throw new HttpException("User not found", HttpStatus.BAD_REQUEST)
            

            if (userData.password !== userExist.password) throw new HttpException("Password is incorrect", HttpStatus.BAD_REQUEST)
            const payload = {
                sub: userExist._id, username: userExist.email, email: userExist.email
            }


            const { access_token, refresh_token } = await this.getToken(payload)
            return { access_token, refresh_token }
        } catch (error) {
            throw new HttpException(error.message, 500)
        }

    }

    async getToken(payload) {

        const access_token = await this.jwtService.signAsync(payload)
        const refresh_token = await this.jwtService.signAsync(payload, {
            expiresIn: "15m",
            secret: process.env.REFRESH_TOKEN_SECRET
        })

        return { access_token, refresh_token }
    }

}
