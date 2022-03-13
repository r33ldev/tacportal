import { Arg, Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { Contact } from '../entities/Contact';
import { ContactInput } from '../utils/inputs';

@ObjectType()
class AllContacts {
  @Field(() => [Contact])
  contacts: Contact[];
  
}

@ObjectType()
@Resolver()
export class ContactResolver {
  @Mutation(() => Contact, { nullable: true })
  async newContact(
    @Arg('options') options: ContactInput
  ): Promise<Contact | null> {
    let contact = await Contact.create({ ...options }).save();
    return contact;
  }

  @Query(() => Contact, { nullable: true })
  async getContact(
    @Arg('subject') subject?: string
  ): Promise<Contact | undefined> {
    // let contact = await Contact.findOne({ ...options });
    let contact = await Contact.findOne({
      subject,
    });
    return contact;
  }

  @Query(() => AllContacts, { nullable: true })
  async allContacts(): Promise<AllContacts | null> {
    let contacts = await Contact.find({});
    return {contacts}
   
  }
}
