import { Injectable } from '@nestjs/common';
import { CreateGlobalGallaryInput } from './dto/create-global-gallary.input';
import { UpdateGlobalGallaryInput } from './dto/update-global-gallary.input';

@Injectable()
export class GlobalGallaryService {
  create(createGlobalGallaryInput: CreateGlobalGallaryInput) {

    
    return createGlobalGallaryInput;
  }

  findAll() {
    return `This action returns all globalGallary`;
  }

  findOne(id: number) {
    return `This action returns a #${id} globalGallary`;
  }

  update(id: number, updateGlobalGallaryInput: UpdateGlobalGallaryInput) {
    return `This action updates a #${id} globalGallary`;
  }

  remove(id: number) {
    return `This action removes a #${id} globalGallary`;
  }
}
