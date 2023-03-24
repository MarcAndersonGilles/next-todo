import React, { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';
import TodoAfficher from './TodoAfficher';
import TodoCreation from './TodoCreation';


interface Todo {
    id: number;
    title: string;
    description: string;
  }

function TodoChercher() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
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

  useEffect(() => {
    const filtered = todos.filter(todo => {
      return todo.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredTodos(filtered);
  }, [searchTerm, todos]);

  return (
    <div className='flex flex-col justify-center mt-10 border rounded'>
      <input
        type='text'
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder='Rechercher des tâches...'
        className='p-8'
      />

      {searchTerm && filteredTodos.map(todo => (
        <div className='bg-white' key={todo.id}>
          <h2>{todo.title}</h2>
        </div>
      ))}
    </div>
  );
}

export default TodoChercher;
