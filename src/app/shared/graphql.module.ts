import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { split } from '@apollo/client/core';
import { getMainDefinition } from '@apollo/client/utilities';
import { environment } from 'src/environments/environment';

export const createApollo = (httpLink: HttpLink) => {
  const http = httpLink.create({ uri: environment.graphQlUri, withCredentials: true });

  const ws = new WebSocketLink({
    uri: environment.wsUrl,
    options: {
      reconnect: true,
    },
  });

  const link = split(
    ({ query }) => {
      const def = getMainDefinition(query);
      return def.kind === 'OperationDefinition' && def.operation === 'subscription';
    },
    ws,
    http
  );

  return {
    link,
    cache: new InMemoryCache(),
  };
};

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
