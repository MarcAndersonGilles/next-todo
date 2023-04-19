import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/supabase'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useSupabaseClient } from '@supabase/auth-helpers-react'




export const supabase = createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const allOnlineUsers = await supabase.from('users').select('*').eq('status', 'ONLINE')
    res.status(200).json(allOnlineUsers)
  }
  
  
  export default handler;
