import { supabase } from '@/utils/supabaseClient';
import { useEffect, useState } from 'react';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Todo {
  id: number;
  title: string;
  description: string;
}

function TodoAfficher() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

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
        <div className=' bg-indigo-700 rounded-2xl mt-6 p-10 ' key={todo.id}>
            <form className='flex flex-col   '>
                <h1 className='bg-black border text-white border-black border-solid'>La Tache à Finir</h1>
                <input
                type="text  "
                value={`Titre: ${todo.title}`}
                className='p-8'
                readOnly
                />
            <textarea
                value={`Description: ${todo.description}`}
                className='p-8 border mt-3'
                readOnly
                />
            </form>
            <div>
            {/* Bouton pour marquer une tâche comme complétée */}
            <button
              className="button-complete"
              //onClick={() => toggleComplete(todo)}
            >
              <CheckCircleIcon id="i" />
            </button>
            {/* Bouton pour éditer une tâche */}
            <button className="button-edit" onClick={() => setIsEditing(true)}>
              <EditIcon id="i" />
            </button>
            {/* Bouton pour supprimer une tâche */}
            <button className="delete" >  {/* onClick={() => handleDelete(todo.id)} */}
              <DeleteIcon id="i" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoAfficher;
