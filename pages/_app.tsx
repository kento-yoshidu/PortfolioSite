import type { AppProps } from 'next/app'

import "./scss/global.scss"

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
