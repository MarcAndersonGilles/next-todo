import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import Layout from '@/components/Layout'

import { supabase } from '@/utils/supabaseClient';

export default function App({ Component, pageProps }: AppProps<{ initialSession: Session }>) {


  // useEffect(() => {
  //   supabase
  //     .from('users')
  //     .select()
  //     .then(({ data, error }) => {
  //       if (error) throw error
  //       console.log(data)
  //     })
  // }, [])
  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}

    >
      <Layout >

        <Component {...pageProps} />
      </Layout>
    </SessionContextProvider>
  )
}
