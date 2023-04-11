import { supabase } from '@/utils/supabaseClient';
import { useEffect, useState } from 'react';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Link from 'next/link';
import { useRouter } from 'next/router';

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

        <div className=' bg-indigo-700 rounded-2xl mt-6 p-10  ' key={todo.id}>
          {editingId === todo.id ? (

            // Afficher les champs d'édition si la tâche est en cours d'édition
            <form className='flex flex-col gap-4' onSubmit={(e) => {
              e.preventDefault();
              handleSave(todo.id);
            }}>
              <h1 className='flex text-white bg-black p-2 rounded-md font-bold text-xl'>
                La Tache
              </h1>
              <div className='flex flex-col'>
                <label className='text-lg text-white font-bold'>Titre</label>
                <input
                  type='text'
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder='Titre'
                  className='p-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  '
                />
              </div>
              <div className='flex flex-col'>
                <label className='text-lg text-white font-bold'>Description</label>
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder='Description'
                  className='p-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  '
                />
              </div>

              <div className='flex flex-row w-full bg-slate-500 justify-evenly border-black shadow-md gap-2  mb-5'>
                <div className=''>
                  <button className='button-save mt-2 mb-3 font-bold ' onClick={() => handleSave(todo.id)}>
                    Enregistrer
                  </button>
                </div>
                <div>
                  <button className='button-save mt-2 mb-3 font-bold' onClick={() => handleCancel()}>
                    Annuler
                  </button>
                </div>


              </div>
            </form>
          ) : (
            // Afficher les informations de la tâche si elle n'est pas en cours d'édition
            <form className='flex flex-col gap-5'>
              <h1 className='flex text-white bg-black p-2 rounded-md font-bold text-xl'>
                La Tache
              </h1>
              <div>
                <label className='text-lg text-white font-bold'>Titre</label>
                <input
                  type='text'
                  value={`Titre: ${todo.title}`}
                  className='p-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  readOnly
                />
              </div>
              <div>
                <label className='text-lg text-white font-bold'>Description</label>
                <textarea
                  value={`Description: ${todo.description}`}
                  className='p-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  readOnly
                />
              </div>

              <Link href={`/todo/${todo.id}`}>
                <div className='flex w-full justify-end'>
                  <button className='button-details flex p-3  mb-3      rounded-full'>
                    <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 32C25.3366 32 32.5 24.8366 32.5 16C32.5 7.16344 25.3366 0 16.5 0C7.66344 0 0.5 7.16344 0.5 16C0.5 24.8366 7.66344 32 16.5 32ZM18.5 10C18.5 8.89543 17.6046 8 16.5 8C15.3954 8 14.5 8.89543 14.5 10V14H10.5C9.39543 14 8.5 14.8954 8.5 16C8.5 17.1046 9.39543 18 10.5 18H14.5V22C14.5 23.1046 15.3954 24 16.5 24C17.6046 24 18.5 23.1046 18.5 22V18H22.5C23.6046 18 24.5 17.1046 24.5 16C24.5 14.8954 23.6046 14 22.5 14H18.5V10Z" fill="#D4D4D8" />
                    </svg>
                  </button>
                </div>

              </Link>
            </form>

          )}
          <div className='flex flex-row w-full bg-white justify-evenly  rounded-lg '>
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
