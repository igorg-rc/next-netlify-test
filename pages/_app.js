import Layout from '../components/Layout'
import '@styles/globals.css'
import {appWithTranslation} from 'next-i18next'
import {QueryClient, QueryClientProvider} from "react-query"

const queryClient = new QueryClient()

function Application({Component, pageProps}) {
  return <QueryClientProvider client={queryClient}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </QueryClientProvider> 
}

export default appWithTranslation(Application)
