import React,{ useState }  from 'react'
import { supabase } from '@/utils/supabaseClient';

import TodoAfficher from '@/components/TodoAfficher'
import TodoChercher from './TodoChercher';

function TodoCreation() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const handleSubmit = async (event :React.FormEvent<HTMLFormElement>) => {
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
  
  return (
    <div className=''>
          <div className='text-white bg-black'>Todo App</div>
          <div className='flex flex-col bg-indigo-500 p-8 '>
            <div className='flex flex-col  '>
              <form className="max-w-lg mx-auto mt-4" onSubmit={handleSubmit}  > {/* onSubmit={handleSubmit}  */}

                <div className="mb-4">

                  <input
                    type="text"
                    placeholder="Title"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    id="description"
                    placeholder="Description"
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
                <p className='mt-5'>PS raffraichir pour voir la tache</p>
              </form>
            </div>
          </div>

        <div>
          <TodoAfficher />
        </div>
        <div>

        </div>
      <TodoChercher/>
        </div>
  )
}

export default TodoCreation