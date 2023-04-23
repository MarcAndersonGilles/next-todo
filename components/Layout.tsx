import React from 'react'
import { ReactNode } from 'react';
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useSession } from '@supabase/auth-helpers-react'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { supabase } from '@/utils/supabaseClient';

interface Props {
    children: ReactNode
}

export default function Layout({ children }: Props) {

    

    return (
        <>
     
            <Navbar />
            <main>{children}</main>
            <Footer />
          
        </>
    )
}
