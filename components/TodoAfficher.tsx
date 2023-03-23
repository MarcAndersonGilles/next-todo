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
        setTodos(data);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {todos.map((todo: Todo) => (
        <div key={todo.id}>
            
          <h2>{todo.title}</h2>
          <p>{todo.description}</p>
        </div>
      ))}
    </div>
  );
}

export default TodoAfficher;
