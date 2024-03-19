import { Module } from '@nestjs/common';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GraphQLService } from './graphql.service';
import { GraphQLController } from './graphql.controller';

@Module({
  providers: [
    {
      provide: 'APOLLO_CLIENT',
      useFactory: () => {
        return new ApolloClient({
          uri: 'https://api.studio.thegraph.com/proxy/67924/hotelereum1/v0.0.4/',
          cache: new InMemoryCache(),
        });
      },
    },
    GraphQLService,
  ],
  exports: ['APOLLO_CLIENT'],
  controllers: [GraphQLController],
})
export class GraphQLModule {}
