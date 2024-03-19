import { Controller, Get, Query } from '@nestjs/common';
import { GraphQLService } from './graphql.service';

@Controller('graphql')
export class GraphQLController {
  constructor(private readonly graphqlService: GraphQLService) {}

  @Get('booking-resolds')
  async getBookingResolds(@Query('transactionHash') transactionHash?: string) {
    if (transactionHash) {
      return this.graphqlService.getBookingResoldsByTransactionHash(
        transactionHash,
      );
    } else {
      return 0;
    }
  }
}
