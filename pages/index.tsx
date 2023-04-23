import React from 'react'
import { useSession, useSupabaseClient} from '@supabase/auth-helpers-react'

import SignupForm from '@/components/SignupForm'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { supabase } from '@/utils/supabaseClient'



const Home = () => {
  const  session  = useSession()

  return (
   
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
       {!session ? (
      <SignupForm  />
      ) : (
        <div>
          <h1>You are connected</h1>
         <p>Email: {session.user.email}</p>
        </div>
       
       
      )}      

    </div>
   
  )
}



export default Home