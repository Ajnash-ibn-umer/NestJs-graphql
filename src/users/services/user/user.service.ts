import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { S3 } from 'aws-sdk';
import { Model } from 'mongoose';
import { Company } from 'src/users/controllers/users/schemas/company.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(Company.name) private companyModal :Model<Company>){}
  async uploadFile(file) {
    try {
      const bucket = await this.s3Config();
      const { originalname } = file;
      const bucketS3 = 'ajn-2615-bucket-aws';
      const params = {
        Bucket: bucketS3,
        Key: String(originalname + '---' + Date.now()),
        Body: file.buffer,
      };
      console.log({ params });

      const uploadInfo = bucket.upload(params, (err, data) => {
        if (err) throw new HttpException(err.message, 500);
        console.log({ data });
      });
      console.log({ uploadInfo });
    } catch (error) {
      throw new HttpException(error.message ?? error, 500);
    }
  }

  async addCompany(data){

    const newCompany=await new this.companyModal(data).save()
  
  console.log({newCompany});

  return newCompany
  
  }

  async s3Config() {
    return new S3({
      accessKeyId: process.env.AWS_KEY_ID,
      secretAccessKey: process.env.AWS_KEY_SECRET,
    });
  }
}
