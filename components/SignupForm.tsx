
import React from 'react'
import { supabase } from '@/utils/supabaseClient'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSession } from '@supabase/auth-helpers-react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router';




function SignupForm() {
  const session = useSession();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();


  const handleSignIn = async (formData: any) => {
  
    const { data: user, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    })
    if (user) {
      
      console.log(user)
      // localStorage.setItem("user", JSON.stringify(user.user))
      // localStorage.setItem("userSession", JSON.stringify(user.session))
      // localStorage.setItem("userid", user.session?.user.id!)
      // localStorage.setItem('access_token', user.session?.access_token!);
      // localStorage.setItem("authenticated", "true")
      // router.push({
      //   pathname:'/users/todo',
        
      // });
    } else if (error) {
      console.log('Error signing in')
    }
    else{
      console.log('User is not signed in')
    }
  };


  console.log(session)

  // useEffect(() => {
  //   const { data: authListener } = supabase.auth.onAuthStateChange(
  //     async (event, session) => {
  //       if (event === 'SIGNED_IN') {
  //         console.log('signed in', session);
  //         localStorage.setItem('user', JSON.stringify(session?.user));
  //         localStorage.setItem('authenticated', 'true');
  //         router.push('/users/todo');
  //       } else if (event === 'SIGNED_OUT') {
  //         console.log('signed out');
  //         localStorage.removeItem('user');
  //         localStorage.removeItem('authenticated');
  //       }
  //     }
  //   );

  //   return () => {
  //     authListener?.subscription.unsubscribe();
  //   };
  // }, [session, router]);
  
  

  console.log(session)
  if (!session)
  return (
    <>
    
    <div className='flex flex-col' >
      <div>
        <>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-slate-600">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">

              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" action="#" method="POST"
                onSubmit={handleSubmit(handleSignIn)}
              >
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      {...register("email",)}
                      name="email"
                      type="email"
                      autoComplete="email"
                      required

                      className="block w-full rounded-md border-0 py-1.5 bg-white  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Password
                    </label>
                    <div className="text-sm">
                      <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      {...register("password")}
                      name="password"
                      type="password"
                      autoComplete="current-password"

                      required
                      className="block w-full rounded-md border-0 py-1.5 bg-white  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

                  >
                    Sign in
                  </button>
                </div>
              </form>


            </div>
          </div>
        </>
      </div>
    </div>

</>
  )
}

export default SignupForm
