import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { S3BucketUtils } from './utils/s3_bucket_util';

@Injectable()
export class AppService {
  async uploadFileService(file, path) {
    let fileUploadResult = [];
    console.log({file,path});
    
    try {
      if (file.hasOwnProperty('image')) {
        for (let image of file['image']) {
          const fileRes = await new S3BucketUtils().uploadMyFile(image, path ?? "main");
          console.log({fileRes});

          if (fileRes['status'] === 0) {
            throw new HttpException(
              'File upload failed',
              HttpStatus.INTERNAL_SERVER_ERROR ,
            );
          }
          fileUploadResult.push({
            url: fileRes['url'],
            fileName: image['originalname']
          })
        }
      }
      
      return fileUploadResult;
    } catch (error) {
      throw error;
    }
  }
}
