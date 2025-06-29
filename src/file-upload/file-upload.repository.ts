import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import * as toStream from 'buffer-to-stream';

@Injectable()
export class FileUploadRepository {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) {
            return reject(new Error(error.message));
          }
          if (!result) {
            return reject(new Error('No result from Cloudinary.'));
          }
          resolve(result);
        },
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      toStream(file.buffer).pipe(upload);
    });
  }
}
