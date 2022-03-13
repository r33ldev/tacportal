import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Subscriber } from '../entities/Subscriber';
import { SubscribeInput } from '../utils/inputs';
import { SubscribeResponse } from '../utils/response';

@Resolver()
export class SubscribeResolver {
  @Mutation(() => SubscribeResponse, { nullable: true })
  async subscribe(
    @Arg('options') options: SubscribeInput
  ): Promise<SubscribeResponse> {
    const subscriber = await Subscriber.create({
      name: options.name,
      email: options.email,
    }).save();
    return { subscriber };
  }

  @Query(() => Subscriber, { nullable: true })
  async subscribers(): Promise<any> {
    let subscribers = Subscriber.find({
      order: {
        name: 'ASC',
        id: 'DESC',
      },
    });
    return {
      subscribers,
    };
  }

  @Query(() => SubscribeResponse, { nullable: true })
  async subscriber(
    @Arg('email') email: string
  ): Promise<SubscribeResponse | null | undefined> {
    let subscriber = await Subscriber.findOne({
      email,
    });
    return { subscriber };
  }
}
