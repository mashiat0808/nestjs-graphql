import { Injectable, Inject } from '@nestjs/common';
import { ApolloClient, gql } from '@apollo/client';

@Injectable()
export class GraphQLService {
  constructor(
    @Inject('APOLLO_CLIENT') private apolloClient: ApolloClient<any>,
  ) {}

  GET_BOOKING_RESOLDS = gql`
    query MyQuery($transactionHash: String!) {
      bookingResolds(where: { transactionHash: $transactionHash }) {
        bidding
        id
        owner
        seller
        sold
        splittable
        startingPrice
        tokenId
        transactionHash
      }
    }
  `;

  async getBookingResoldsByTransactionHash(transactionHash: string) {
    const result = await this.apolloClient.query({
      query: this.GET_BOOKING_RESOLDS,
      variables: { transactionHash },
    });
    return result.data.bookingResolds;
  }

  async executeQuery(query: string, variables?: any) {
    const result = await this.apolloClient.query({
      query: gql`
        ${query}
      `,
      variables,
    });
    return result.data;
  }
}
