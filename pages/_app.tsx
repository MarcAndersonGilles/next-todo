import '@/styles/globals.css' 
import type { AppProps } from 'next/app'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { useState, useEffect } from 'react'
import {Database} from '@/types/supabase'
import Layout from '@/components/Layout'
import SignupForm from '@/components/SignupForm'

import { createClient } from '@supabase/supabase-js';
import { supabase } from '@/utils/supabaseClient';

export default function App({ Component, pageProps }: AppProps<{initialSession: Session}>) {
  
 
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
     
    >
      <Layout >
        
      <Component {...pageProps}  />
      </Layout>
    </SessionContextProvider>
  )
}
