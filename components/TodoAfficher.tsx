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

  const handleDelete = async (todoId: number) => {
    const { error } = await supabase.from('todos').delete().match({ id: todoId });
    if (error) {
      console.log('error deleting task', error);
    } else {
      const updatedTodos = todos.filter(todo => todo.id !== todoId);
      setTodos(updatedTodos);
    }
  };



  const handleSave = async (todoId: number) => {
    // Modifier la tâche dans la base de données
    const { error } = await supabase.from('todos').update({ title, description }).match({ id: todoId });
    if (error) {
      console.log('error updating task', error);
    } else {
      // Mettre à jour l'état des tâches
      const updatedTodos = todos.map(todo => {
        if (todo.id === todoId) {
          return { id: todo.id, title, description };
        } else {
          return todo;
        }
      });
      setTodos(updatedTodos);
      setEditingId(null);
      setTitle('');
      setDescription('');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
  };

  const handleEdit = (todoId: number) => {
    const todoToEdit = todos.find(todo => todo.id === todoId);
    if (todoToEdit) {
      setEditingId(todoToEdit.id);
      setTitle(todoToEdit.title);
      setDescription(todoToEdit.description);
    }
  };


  return (
    <div>

      {todos.map((todo: Todo) => (

        <div className=' bg-indigo-700 rounded-2xl mt-6 p-10 ' key={todo.id}>
          {editingId === todo.id ? (
            // Afficher les champs d'édition si la tâche est en cours d'édition
            <form className='flex flex-col' onSubmit={(e) => {
              e.preventDefault();
              handleSave(todo.id);
            }}>
              <input
                type='text'
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder='Titre'
                className='p-8'
              />
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder='Description'
                className='p-8 border mt-3'
              />
              <div className='flex flex-row w-full bg-slate-500 justify-evenly border'>
                <button className='button-save mt-2 mb-3' onClick={() => handleSave(todo.id)}>
                  Enregistrer
                </button>
                <button className='button-cancel mt-2 mb-3' onClick={() => handleCancel()}>
                  Annuler
                </button>
              </div>
            </form>
          ) : (
            // Afficher les informations de la tâche si elle n'est pas en cours d'édition
            <form className='flex flex-col'>
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
            </form>
          )}
          <div className='flex flex-row w-full bg-slate-500 justify-evenly border '>
            {/* Bouton pour marquer une tâche comme complétée */}
            <button className='button-complete mt-2 mb-3 '>
              <CheckCircleIcon id='i' />
            </button>
            {/* Bouton pour éditer une tâche */}
            <button
              className='button-edit mt-2 mb-3  '
              onClick={() => handleEdit(todo.id)}
              disabled={isEditing && editingId !== todo.id}>
              <EditIcon id='i' />
            </button>
            {/* Bouton pour supprimer une tâche */}
            <button className='delete mt-2 mb-3 ' onClick={() => handleDelete(todo.id)}>
              <DeleteIcon id='i' />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoAfficher;
