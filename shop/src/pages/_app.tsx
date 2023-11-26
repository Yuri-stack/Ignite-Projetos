import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import { Header } from '../components/Header'
import { Container } from '../styles/pages/app'
import { ContextProvider } from '../context/Context'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
    </ContextProvider>
  )
}
