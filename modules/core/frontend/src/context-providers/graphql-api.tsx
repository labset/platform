import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import type { NormalizedCacheObject } from "@apollo/client";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from "react";

interface GraphqlApi {
  client: ApolloClient<NormalizedCacheObject>;
}

const GraphqlApiContext = createContext<GraphqlApi>({
  client: new ApolloClient<NormalizedCacheObject>({
    cache: new InMemoryCache(),
  }),
});

const useGraphqlApi = () => useContext(GraphqlApiContext);

interface GraphqlApiProviderProps extends PropsWithChildren {
  clientProvider: () => ApolloClient<NormalizedCacheObject>;
}

const GraphqlApiProvider = ({
  children,
  clientProvider,
}: GraphqlApiProviderProps) => {
  const value = useMemo(() => {
    return { client: clientProvider() };
  }, []);

  return (
    <GraphqlApiContext.Provider value={value}>
      <ApolloProvider client={value.client}>{children}</ApolloProvider>
    </GraphqlApiContext.Provider>
  );
};

export { GraphqlApiProvider, useGraphqlApi };
