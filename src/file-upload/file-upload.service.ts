import { Injectable } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from 'src/products/entities/product.entity';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async upload(file: Express.Multer.File, id: string): Promise<string> {
    const { url } = await this.fileUploadRepository.uploadImage(file);
    await this.productsRepository.update(id, { imgUrl: url });
    return 'Url actualizado';
  }
}
