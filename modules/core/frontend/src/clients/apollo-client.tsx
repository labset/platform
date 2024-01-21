import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import type { NormalizedCacheObject } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

interface ApolloClientProps {
  product: { key: string; gatewayUrl: string };
  token: string | null;
}

const apolloClient = ({ token, product }: ApolloClientProps) => {
  const auth = setContext((_, { headers }) => {
    if (!token) return { headers: { ...headers } };
    return {
      headers: { ...headers, [`x-labset-${product.key}-token`]: token },
    };
  });

  const api = new HttpLink({
    credentials: "include",
    uri: `${product.gatewayUrl}/graphql-api`,
    useGETForQueries: false,
  });

  const link = ApolloLink.from([auth, api]);

  return new ApolloClient<NormalizedCacheObject>({
    assumeImmutableResults: true,
    cache: new InMemoryCache(),
    link,
  });
};

export { apolloClient };
