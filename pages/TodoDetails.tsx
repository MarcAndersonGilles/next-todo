// import { supabase } from '@/utils/supabaseClient';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';

// interface Todo {
//   id: number;
//   title: string;
//   description: string;
// }

// export default function TodoDetails() {
//   const router = useRouter();
//   const [todo, setTodo] = useState<Todo | null>(null);

//   useEffect(() => {
//     const fetchTodo = async () => {
//       const todoId = Number(router.query.id);
//       if (!Number.isNaN(todoId)) {
//         const { data, error } = await supabase.from('todos').select('*').eq('id', todoId).single();
//         if (error) {
//           console.log('error fetching task', error);
//         } else {
//           setTodo({
//             id: data.id,
//             title: data.title,
//             description: data.description,
//           });
//         }
//       }
//     };

//     fetchTodo();
//   }, [router.query.id]);

//   if (!todo) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>{todo.title}</h1>
//       <p>{todo.description}</p>
//     </div>
//   );
// }
