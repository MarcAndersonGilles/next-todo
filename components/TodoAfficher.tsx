import { supabase } from '@/utils/supabaseClient';
import { useEffect, useState } from 'react';

interface Todo {
  id: number;
  title: string;
  description: string;
}

function TodoAfficher() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('todos').select('*');
      if (error) {
        console.log('error fetching tasks', error);
      } else {
        const todos = data.map((todo: any) => ({
          id: todo.id,
          title: todo.title,
          description: todo.description,
        }));
        setTodos(todos);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {todos.map((todo: Todo) => (
        <div key={todo.id}>
            <form className='border'>
                <input
                type="text"
                value={todo.title}
                />
            <input
                type="text"
                value={todo.description}
                />
            </form>
         
        </div>
      ))}
    </div>
  );
}

export default TodoAfficher;
