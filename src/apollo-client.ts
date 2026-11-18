import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {authorization: `Bearer ${import.meta.env.VITE_GITHUB_API}`},
  cache: new InMemoryCache()
});

export default client;
