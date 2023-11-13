import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GlobalGallaryService } from './global-gallary.service';
import { GlobalGallary } from './entities/global-gallary.entity';
import { CreateGlobalGallaryInput } from './dto/create-global-gallary.input';
import { UpdateGlobalGallaryInput } from './dto/update-global-gallary.input';

@Resolver(() => GlobalGallary)
export class GlobalGallaryResolver {
  constructor(private readonly globalGallaryService: GlobalGallaryService) {}

  @Mutation(() => GlobalGallary)
  createGlobalGallary(@Args('createGlobalGallaryInput') createGlobalGallaryInput: CreateGlobalGallaryInput) {
    return this.globalGallaryService.create(createGlobalGallaryInput);
  }

  @Query(() => [GlobalGallary], { name: 'globalGallary' })
  findAll() {
    return this.globalGallaryService.findAll();
  }

  @Query(() => GlobalGallary, { name: 'globalGallary' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.globalGallaryService.findOne(id);
  }

  @Mutation(() => GlobalGallary)
  updateGlobalGallary(@Args('updateGlobalGallaryInput') updateGlobalGallaryInput: UpdateGlobalGallaryInput) {
    return this.globalGallaryService.update(updateGlobalGallaryInput.id, updateGlobalGallaryInput);
  }

  @Mutation(() => GlobalGallary)
  removeGlobalGallary(@Args('id', { type: () => Int }) id: number) {
    return this.globalGallaryService.remove(id);
  }
}
