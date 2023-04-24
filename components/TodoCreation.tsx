import React, { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabaseClient';

import TodoAfficher from '@/components/TodoAfficher'
import TodoChercher from './TodoChercher';

import { useSession } from '@supabase/auth-helpers-react';
import Router from 'next/router';





function TodoCreation() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
const session = useSession();


 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { data, error } = await supabase
      .from('todos')
      .insert({ title, description });
    if (error) {
      console.log('error inserting task', error);
    } else {
      console.log('task inserted', data);
      setTitle('');
      setDescription('');
    }
  };

 
    if(!session){
      Router.push({pathname:'/users/login',});
    }

  

  

console.log(session)
if(session)
  return (
    
    <div className='flex flex-col w-full justify-center items-center'>
    <div className='flex flex-col w-1/2 justify-center'>
      <div className='flex text-white bg-black p-2 rounded-md font-bold text-xl'>Todo App</div>
      <div className='flex flex-col bg-indigo-500 p-10 rounded-md '>
        <div className='flex flex-col  '>
          <form className="max-w-lg mx-auto mt-4" onSubmit={handleSubmit}  > {/* onSubmit={handleSubmit}  */}

            <div className="mb-4">
              <label className='text-lg text-white font-bold' >Titre</label>
              <input
                type="text"
                placeholder="Écrit ton titre ici"
                id="title"
                name="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className='text-lg text-white font-bold' >Description</label>
              <textarea
                id="description"
                placeholder="Écrit ta description ici"
                name="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ></textarea>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Soumettre
              </button>
            </div>

          </form>
        </div>
      </div>

      <div>
        <TodoAfficher />
      </div>
      <div>

      </div>
      <TodoChercher />
    </div>
    </div>
  )
}

export default TodoCreation