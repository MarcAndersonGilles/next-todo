import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import TodoAfficher from '@/components/TodoAfficher';
interface Todo {
  id: number;
  title: string;
  description: string;
}

export default function TodoDetails() {
  const router = useRouter();
  const [todo, setTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const fetchTodo = async () => {
      const todoId = Number(router.query.id);
      if (!Number.isNaN(todoId)) {
        const { data, error } = await supabase.from('todos').select('*').eq('id', todoId).single();
        if (error) {
          console.log('error fetching task', error);
        } else {
          setTodo({
            id: data.id,
            title: data.title,
            description: data.description,
          });
        }
      }
    };

    fetchTodo();
  }, [router.query.id]);

  if (!todo) {
    return <div>Loading...</div>;
  }

  return (
    
    <form className='flex flex-col mt-16  '>
      <div className='flex flex-col '>
              <h1 className='bg-black border text-white border-black border-solid'>
                La Tache à Finir
              </h1>
              <input
                type='text'
                value={`Titre: ${todo.title}`}
                className='p-8'
                readOnly
              />
              <textarea
                value={`Description: ${todo.description}`}
                className='p-8 border mt-3'
                readOnly
              />
              {/* <Link href={`/todo/${todo.id}`}>
              <button className='button-details mt-2 mb-3 border bg-white border-red-600'>
                Détails
              </button>
              </Link> */}
              </div>
            </form>
  );
}
