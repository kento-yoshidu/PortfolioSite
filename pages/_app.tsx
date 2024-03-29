import type { AppProps } from 'next/app'

import { ApolloProvider } from '@apollo/client'
import client from '../apollo-client'

import "./css/global.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
export default MyApp
