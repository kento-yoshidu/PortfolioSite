import { ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
  uri: "https://api.github.com/graphq",
  headers: {authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_API}`},
  cache: new InMemoryCache()
})

export default client
