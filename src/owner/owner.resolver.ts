import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OwnerService } from './owner.service';
import { Owner } from './entities/owner.entity';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';

@Resolver(() => Owner)
export class OwnerResolver {
  constructor(private readonly ownerService: OwnerService) {}

  @Mutation(() => Owner)
  createOwner(@Args('createOwnerInput') createOwnerInput: CreateOwnerInput) {
    return this.ownerService.create(createOwnerInput);
  }

  @Query(() => [Owner], { name: 'owners' })
  findAll(): Promise<Owner[]> {
    return this.ownerService.findAll();
  }

  @Query(() => Owner, { name: 'owner' })
  findOne(@Args('id') id: string): Promise<Owner> {
    return this.ownerService.findOne(id);
  }

  @Mutation(() => Owner)
  updateOwner(@Args('updateOwnerInput') updateOwnerInput: UpdateOwnerInput, @Args('id') id: string): Promise<Owner> {
    return this.ownerService.update(id, updateOwnerInput);
  }

  @Mutation(() => Owner)
  removeOwner(@Args('id') id: string): Promise<Owner> {
    return this.ownerService.remove(id);
  }
}
